"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { MotionConfig } from "framer-motion";
import CommandMenu from "./CommandMenu";

type Theme = "dark" | "light";

type UI = {
  theme: Theme;
  toggleTheme: () => void;
  openMenu: () => void;
  toast: (message: string) => void;
};

const UIContext = createContext<UI | null>(null);

export const useUI = () => {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error("useUI must be used inside <Providers>");
  return ctx;
};

export default function Providers({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [menuOpen, setMenuOpen] = useState(false);
  const [toastText, setToastText] = useState<string | null>(null);

  // The inline script in layout.tsx already set the attribute; read it back
  useEffect(() => {
    const current = document.documentElement.getAttribute("data-theme");
    // eslint-disable-next-line react-hooks/set-state-in-effect -- syncing with the value the pre-paint script chose
    if (current === "light" || current === "dark") setTheme(current);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((t) => {
      const next = t === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      try {
        localStorage.setItem("theme", next);
      } catch {
        // storage can be blocked; the choice just won't be remembered
      }
      return next;
    });
  }, []);

  const toast = useCallback((message: string) => {
    setToastText(message);
    window.setTimeout(() => setToastText(null), 2200);
  }, []);

  // Ctrl/Cmd + K opens the command menu from anywhere
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setMenuOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <UIContext.Provider value={{ theme, toggleTheme, openMenu: () => setMenuOpen(true), toast }}>
      <MotionConfig reducedMotion="user">
        {children}
        <CommandMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
        {toastText && (
          <div className="toast" role="status">
            {toastText}
          </div>
        )}
      </MotionConfig>
    </UIContext.Provider>
  );
}
