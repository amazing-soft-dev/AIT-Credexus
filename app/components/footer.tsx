import { Link } from "react-router";
import { footerNav, site } from "~/data/site";
import { Logo } from "./logo";

export function Footer() {
  return (
    <footer className="border-border relative mt-24 border-t">
      <div className="container-x grid gap-12 py-16 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div className="max-w-xs">
          <Logo />
          <p className="text-muted mt-4 text-sm leading-relaxed">
            Connecting software engineers in Latam, Asia, Europe and Canada with remote AI training
            work. Free for candidates.
          </p>
          <div className="mt-5 flex gap-2">
            <a
              href={site.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Credexus on LinkedIn"
              className="border-border text-muted hover:border-border-strong hover:text-foreground grid size-9 place-items-center rounded-full border transition-colors"
            >
              <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden>
                <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.8 0 0 .77 0 1.73v20.54C0 23.23.8 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
              </svg>
            </a>
            <a
              href={site.socials.x}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Credexus on X"
              className="border-border text-muted hover:border-border-strong hover:text-foreground grid size-9 place-items-center rounded-full border transition-colors"
            >
              <svg viewBox="0 0 24 24" className="size-3.5" fill="currentColor" aria-hidden>
                <path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.21-6.82-5.97 6.82H1.67l7.73-8.84L1.25 2.25h6.83l4.71 6.23 5.45-6.23zm-1.16 17.52h1.83L7.08 4.13H5.12l11.96 15.64z" />
              </svg>
            </a>
          </div>
        </div>
        {footerNav.map((col) => (
          <div key={col.title}>
            <h2 className="text-subtle text-xs font-medium tracking-[0.16em] uppercase">
              {col.title}
            </h2>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-muted hover:text-foreground text-sm transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="container-x">
        <div className="border-border text-subtle flex flex-col gap-3 border-t py-6 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.legalName}. Independent recruiting agency — platform
            names are trademarks of their respective owners.
          </p>
          <div className="flex gap-5">
            <Link to="/privacy" className="hover:text-foreground">
              Privacy
            </Link>
            <Link to="/terms" className="hover:text-foreground">
              Terms
            </Link>
            <a href="/sitemap.xml" className="hover:text-foreground">
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
