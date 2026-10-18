"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useSpring } from "framer-motion";
import { FiCommand, FiMoon, FiSun } from "react-icons/fi";
import { nav } from "@/data/site";
import { useUI } from "./Providers";

export default function Header({ home = true }: { home?: boolean }) {
  const { theme, toggleTheme, openMenu } = useUI();
  const [scrolled, setScrolled] = useState(false);
  const [current, setCurrent] = useState<string | null>(null);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      if (!home) return;
      // The section whose top has passed 40% of the screen is the current one
      const marker = window.innerHeight * 0.4;
      let found: string | null = null;
      for (const { id } of nav) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= marker) found = id;
      }
      setCurrent(found);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [home]);

  return (
    <>
      <motion.div className="scroll-progress" style={{ scaleX: progress }} aria-hidden="true" />
      <header className={`header ${scrolled ? "header--scrolled" : ""}`}>
        <div className="header__bar">
          <Link href="/" className="logo" aria-label="Tejas Badhe, home">
            <span className="logo__mark">TB</span>
            <span>Tejas</span>
          </Link>

          <nav className="header__nav" aria-label="Sections">
            {nav.map(({ id, label }) => (
              <Link key={id} href={home ? `#${id}` : `/#${id}`} aria-current={current === id ? "true" : undefined}>
                {current === id && (
                  <motion.span layoutId="nav-pill" className="header__nav-pill" transition={{ type: "spring", stiffness: 400, damping: 34 }} />
                )}
                {label}
              </Link>
            ))}
          </nav>

          <div className="header__actions">
            <button className="kbd-btn" onClick={openMenu} aria-label="Open command menu">
              <FiCommand aria-hidden="true" />
              <span>Menu</span>
              <span className="kbd">⌘K</span>
            </button>
            <button
              className="icon-btn"
              onClick={toggleTheme}
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            >
              <motion.span key={theme} initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} style={{ display: "grid" }}>
                {theme === "dark" ? <FiSun /> : <FiMoon />}
              </motion.span>
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
