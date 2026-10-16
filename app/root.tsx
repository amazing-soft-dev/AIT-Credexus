import { LazyMotion, MotionConfig } from "framer-motion";
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  type LinksFunction,
} from "react-router";
import { Footer } from "~/components/footer";
import { Header } from "~/components/header";
import { SmoothScroll } from "~/components/motion/smooth-scroll";
import type { Route } from "./+types/root";
import * as React from "react";
import "./app.css";

export const links: LinksFunction = () => [
  { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
  { rel: "icon", href: "/favicon.ico", sizes: "32x32" },
  { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
  { rel: "manifest", href: "/site.webmanifest" },
];

const loadMotionFeatures = () => import("~/lib/motion-features").then((mod) => mod.default);

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#06071a" />
        <link
          rel="preload"
          href="/fonts/geist-latin.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <Meta />
        <Links />
      </head>
      <body className="min-h-dvh">
        <a
          href="#main"
          className="text-background sr-only z-[100] rounded-full bg-white px-4 py-2 focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

function useMarkLoaded() {
  React.useEffect(() => {
    const mark = () =>
      requestAnimationFrame(() => document.documentElement.setAttribute("data-loaded", ""));
    if (document.readyState === "complete") mark();
    else window.addEventListener("load", mark, { once: true });
    return () => window.removeEventListener("load", mark);
  }, []);
}

export default function App() {
  useMarkLoaded();
  return (
    <LazyMotion features={loadMotionFeatures} strict>
      <MotionConfig reducedMotion="user">
        <SmoothScroll />
        <Header />
        <main id="main" className="overflow-x-clip">
          <Outlet />
        </main>
        <Footer />
      </MotionConfig>
    </LazyMotion>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let title = "Something went wrong";
  let details = "An unexpected error occurred. Please try again.";
  let stack: string | undefined;
  if (isRouteErrorResponse(error)) {
    title = error.status === 404 ? "Page not found" : `Error ${error.status}`;
    details =
      error.status === 404
        ? "The page you're looking for doesn't exist or has moved."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }
  return (
    <LazyMotion features={loadMotionFeatures} strict>
      <MotionConfig reducedMotion="user">
        <Header />
        <main
          id="main"
          className="container-x flex min-h-[70vh] flex-col items-center justify-center pt-32 text-center"
        >
          <p className="eyebrow">Credexus</p>
          <h1 className="text-gradient mt-5 text-4xl font-semibold sm:text-5xl">{title}</h1>
          <p className="text-muted mt-4 max-w-md">{details}</p>
          <a href="/" className="text-accent mt-8 underline underline-offset-4">
            Back to home
          </a>
          {stack && (
            <pre className="text-subtle mt-8 max-w-full overflow-x-auto text-left text-xs">
              {stack}
            </pre>
          )}
        </main>
        <Footer />
      </MotionConfig>
    </LazyMotion>
  );
}
