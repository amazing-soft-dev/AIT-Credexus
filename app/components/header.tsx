import { ArrowRight, Menu, X } from "lucide-react";
import * as React from "react";
import { Link, NavLink, useLocation } from "react-router";
import { Button } from "~/components/ui/button";
import { nav } from "~/data/site";
import { cn } from "~/lib/utils";
import { Logo } from "./logo";

export function Header() {
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const location = useLocation();

  React.useEffect(() => setOpen(false), [location.pathname]);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5">
      <div
        className={cn(
          "mx-auto flex h-14 max-w-6xl items-center justify-between rounded-full border px-3 pl-5 transition-all duration-300",
          scrolled || open
            ? "border-border bg-background/75 shadow-[0_10px_40px_-15px_rgb(0_0_0/0.6)] backdrop-blur-xl"
            : "border-transparent bg-transparent",
        )}
      >
        <Link to="/" aria-label="Credexus home" className="rounded-md">
          <Logo />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              prefetch="intent"
              className={({ isActive }) =>
                cn(
                  "rounded-full px-3.5 py-2 text-sm transition-colors",
                  isActive ? "text-foreground" : "text-muted hover:text-foreground",
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link to="/for-engineers#apply" prefetch="intent">
              Apply now <ArrowRight />
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="!size-5" /> : <Menu className="!size-5" />}
          </Button>
        </div>
      </div>

      <div
        id="mobile-menu"
        hidden={!open}
        className="border-border bg-background/95 mx-auto mt-2 max-w-6xl rounded-3xl border p-3 backdrop-blur-xl lg:hidden"
      >
        <nav aria-label="Mobile" className="flex flex-col">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  "rounded-2xl px-4 py-3 text-[15px]",
                  isActive ? "text-foreground bg-white/5" : "text-muted",
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
          <Button asChild className="mt-2">
            <Link to="/for-engineers#apply">
              Apply now <ArrowRight />
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
