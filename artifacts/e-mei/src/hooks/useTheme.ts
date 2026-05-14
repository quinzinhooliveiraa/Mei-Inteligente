import { useState, useEffect } from "react";

export type Theme = "dark" | "light";

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  if (theme === "light") {
    root.classList.add("light");
    root.classList.remove("dark");
  } else {
    root.classList.remove("light");
    root.classList.add("dark");
  }

  // Swap favicon dynamically
  const favicon = document.querySelector("link[rel='icon']") as HTMLLinkElement | null;
  if (favicon) {
    favicon.href = theme === "light" ? "/favicon-light.png" : "/favicon.png";
  }
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem("emei-theme") as Theme | null;
    return saved ?? "dark";
  });

  useEffect(() => {
    applyTheme(theme);
    localStorage.setItem("emei-theme", theme);
  }, [theme]);

  const toggle = () => setTheme(t => (t === "dark" ? "light" : "dark"));

  return { theme, toggle };
}
