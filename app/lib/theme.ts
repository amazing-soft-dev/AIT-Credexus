import * as React from "react";

export type Theme = "dark" | "light";

export const THEME_STORAGE_KEY = "theme";

/** Browser-chrome colors. Dark matches public/site.webmanifest. */
export const THEME_COLOR: Record<Theme, string> = {
  dark: "#06071a",
  light: "#f4f6fb",
};

export function readTheme(): Theme {
  try {
    return localStorage.getItem(THEME_STORAGE_KEY) === "light" ? "light" : "dark";
  } catch {
    return "dark";
  }
}

export function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  root.classList.toggle("light", theme === "light");
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    /* Private mode and blocked storage keep the in-memory class. */
  }
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", THEME_COLOR[theme]);
}

/**
 * Runs from root before paint. Default stays dark. Keep the colors in sync with THEME_COLOR.
 * Inline and synchronous on purpose: a deferred script would flash the wrong theme.
 */
export const themeBootScript = `(function(){try{var light=localStorage.getItem("${THEME_STORAGE_KEY}")==="light";var d=document.documentElement;d.classList.toggle("dark",!light);d.classList.toggle("light",light);var m=document.querySelector('meta[name="theme-color"]');if(m)m.setAttribute("content",light?"${THEME_COLOR.light}":"${THEME_COLOR.dark}");}catch(e){}})();`;

/** useLayoutEffect in the browser, useEffect during SSR (no layout phase, no warning). */
export const useClientLayoutEffect =
  typeof document !== "undefined" ? React.useLayoutEffect : React.useEffect;
