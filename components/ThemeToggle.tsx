"use client";
import { useEffect, useState } from "react";
import styles from "./ThemeToggle.module.css";

type Mode = "light" | "dark";

export default function ThemeToggle() {
  const [mode, setMode] = useState<Mode | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("penpus-theme") as Mode | null;
    const system = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    setMode(saved ?? system);
  }, []);

  function toggle() {
    const next: Mode = mode === "dark" ? "light" : "dark";
    setMode(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("penpus-theme", next);
    } catch {
      /* private mode — ignore */
    }
  }

  const isDark = mode === "dark";
  return (
    <button
      className={styles.toggle}
      onClick={toggle}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      aria-pressed={isDark}
      // Avoid a hydration flicker before we've read the stored preference.
      suppressHydrationWarning
    >
      {mode === null ? "" : isDark ? "☀" : "☾"}
    </button>
  );
}
