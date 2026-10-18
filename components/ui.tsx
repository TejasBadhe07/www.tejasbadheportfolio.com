"use client";

import { motion } from "framer-motion";

// Fades and lifts its children in the first time they scroll into view
export function Reveal({
  children,
  delay = 0,
  className = "",
  as = "div",
  spot = false,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "article";
  spot?: boolean;
}) {
  const Comp = motion[as];
  return (
    <Comp
      className={spot ? `${className} spotlight` : className}
      onMouseMove={spot ? spotlight : undefined}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Comp>
  );
}

export function SectionHead({ eyebrow, title, sub }: { eyebrow: string; title: React.ReactNode; sub?: string }) {
  return (
    <Reveal className="section-head">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="section-title">{title}</h2>
      {sub && <p className="section-sub">{sub}</p>}
    </Reveal>
  );
}

// Moves the card's glow to follow the mouse (see .spotlight in globals.css)
export function spotlight(e: React.MouseEvent<HTMLElement>) {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  el.style.setProperty("--mx", `${e.clientX - r.left}px`);
  el.style.setProperty("--my", `${e.clientY - r.top}px`);
}
