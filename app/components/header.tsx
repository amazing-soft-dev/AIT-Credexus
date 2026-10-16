import { AnimatePresence, m } from "framer-motion";
import { ArrowRight, Menu, Moon, Sun, X } from "lucide-react";
import * as React from "react";
import { Link, NavLink, useLocation } from "react-router";
import { Button, buttonVariants } from "~/components/ui/button";
import { nav } from "~/data/site";
import { applyTheme, readTheme, useClientLayoutEffect, type Theme } from "~/lib/theme";
import { cn } from "~/lib/utils";
import { Logo } from "./logo";

function ThemeToggle() {
  const [theme, setTheme] = React.useState<Theme>("dark");

  useClientLayoutEffect(() => {
    setTheme(readTheme());
  }, []);

  const next: Theme = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "size-9")}
      aria-label={next === "light" ? "Switch to light theme" : "Switch to dark theme"}
      onClick={() => {
        applyTheme(next);
        setTheme(next);
      }}
    >
      {theme === "dark" ? <Sun className="!size-4" /> : <Moon className="!size-4" />}
    </button>
  );
}

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

  const raised = scrolled || open;

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          "mx-auto grid h-16 w-full max-w-6xl grid-cols-[1fr_auto_1fr] items-center border px-5 transition-[background-color,border-color,box-shadow,border-radius,margin,height,padding] duration-300 sm:px-8",
          raised
            ? "border-border bg-background/80 mt-3 h-14 rounded-full px-3 shadow-[0_10px_40px_-18px_rgb(8_10_40/0.55)] backdrop-blur-xl sm:px-4"
            : "border-transparent bg-transparent",
        )}
      >
        <Link
          to="/"
          aria-label="Credexus home"
          className="col-start-1 justify-self-start rounded-md"
        >
          <Logo />
        </Link>

        <nav aria-label="Main" className="col-start-2 hidden items-center gap-0.5 lg:flex">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              prefetch="intent"
              className={({ isActive }) =>
                cn(
                  "rounded-full px-3 py-2 text-sm transition-colors",
                  isActive ? "text-foreground" : "text-foreground/75 hover:text-foreground",
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="col-start-3 flex items-center gap-1.5 justify-self-end sm:gap-2">
          <ThemeToggle />
          <Button asChild size="sm" variant="white" className="hidden sm:inline-flex">
            <Link to="/for-engineers#apply" prefetch="intent">
              Apply now <ArrowRight />
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="size-9 lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="!size-5" /> : <Menu className="!size-5" />}
          </Button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {open ? (
          <m.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0, y: -8 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.44, 0, 0.56, 1] }}
            className="border-border bg-background/95 mx-auto mt-2 max-w-6xl overflow-hidden rounded-3xl border p-3 backdrop-blur-xl lg:hidden"
          >
            <nav aria-label="Mobile" className="flex flex-col">
              {nav.map((item, i) => (
                <m.div
                  key={item.to}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 + i * 0.04, duration: 0.25 }}
                >
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      cn(
                        "block rounded-2xl px-4 py-3 text-[15px]",
                        isActive ? "text-foreground bg-foreground/5" : "text-muted",
                      )
                    }
                  >
                    {item.label}
                  </NavLink>
                </m.div>
              ))}
              <m.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.16, duration: 0.25 }}
              >
                <Button asChild variant="white" className="mt-2 w-full">
                  <Link to="/for-engineers#apply">
                    Apply now <ArrowRight />
                  </Link>
                </Button>
              </m.div>
            </nav>
          </m.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
