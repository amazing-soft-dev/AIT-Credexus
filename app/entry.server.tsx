import { Writable } from "node:stream";
import { renderToPipeableStream } from "react-dom/server";
import type { AppLoadContext, EntryContext } from "react-router";
import { ServerRouter } from "react-router";
// Full site stylesheet as a string (server bundle only — never shipped to the browser as JS).
import inlineCss from "./app.css?inline";

export const streamTimeout = 5_000;

/**
 * Inlines the site stylesheet into <head> and makes the external <link> non-render-blocking.
 *
 * Why: on slow mobile connections the separate CSS request delays first paint (Lighthouse
 * mobile). The marketing pages carry no streamed/deferred data, so we render the full
 * document, then swap the blocking stylesheet for an inline <style>. The external file still
 * downloads at low priority (media="print" → "all" on load) so it is cached for later visits.
 * React 19 tolerates the extra <style> tag in <head> during hydration.
 */
function inlineStylesheet(html: string) {
  if (import.meta.env.DEV || !inlineCss) return html;
  const linkRe = /<link rel="stylesheet" href="(\/assets\/[^"]+\.css)"\/>/;
  const match = html.match(linkRe);
  if (!match) return html;
  const href = match[1];
  const style = `<style data-inline-css>${inlineCss.replace(/<\/style/gi, "<\\/style")}</style>`;
  const deferred = `<link rel="stylesheet" href="${href}" media="print" onload="this.media='all'"/>`;
  return html.replace(linkRe, deferred).replace(/<head>/, `<head>${style}`);
}

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  routerContext: EntryContext,
  _loadContext: AppLoadContext,
) {
  if (request.method.toUpperCase() === "HEAD") {
    return new Response(null, { status: responseStatusCode, headers: responseHeaders });
  }

  return new Promise<Response>((resolve, reject) => {
    let shellRendered = false;
    const chunks: Buffer[] = [];
    let timeoutId: ReturnType<typeof setTimeout> | undefined = setTimeout(
      () => abort(),
      streamTimeout + 1000,
    );

    const sink = new Writable({
      write(chunk, _enc, cb) {
        chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
        cb();
      },
      final(cb) {
        clearTimeout(timeoutId);
        timeoutId = undefined;
        const html = inlineStylesheet(Buffer.concat(chunks).toString("utf8"));
        responseHeaders.set("Content-Type", "text/html; charset=utf-8");
        resolve(new Response(html, { headers: responseHeaders, status: responseStatusCode }));
        cb();
      },
    });

    const { pipe, abort } = renderToPipeableStream(
      <ServerRouter context={routerContext} url={request.url} />,
      {
        // Wait for the whole document: lets us post-process it and gives crawlers full HTML.
        onAllReady() {
          shellRendered = true;
          pipe(sink);
        },
        onShellError(error: unknown) {
          reject(error);
        },
        onError(error: unknown) {
          responseStatusCode = 500;
          if (shellRendered) console.error(error);
        },
      },
    );
  });
}
