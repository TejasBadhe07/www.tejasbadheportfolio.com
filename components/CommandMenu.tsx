"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { FiSearch, FiArrowRight, FiCopy, FiDownload, FiMoon, FiSun, FiGithub, FiLinkedin, FiMail, FiBookOpen } from "react-icons/fi";
import { nav, profile } from "@/data/site";
import { useUI } from "./Providers";

type Item = {
  id: string;
  group: "Go to" | "Actions" | "Links";
  label: string;
  icon: React.ReactNode;
  hint?: string;
  run: () => void;
};

export default function CommandMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { theme, toggleTheme, toast } = useUI();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const items = useMemo<Item[]>(() => {
    const go = (id: string) => () => {
      if (window.location.pathname !== "/") {
        router.push(`/#${id}`);
        return;
      }
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    };
    return [
      { id: "top", group: "Go to", label: "Home", icon: <FiArrowRight />, run: go("top") },
      ...nav.map((n) => ({ id: n.id, group: "Go to" as const, label: n.label, icon: <FiArrowRight />, run: go(n.id) })),
      {
        id: "copy-email",
        group: "Actions",
        label: "Copy email address",
        icon: <FiCopy />,
        hint: profile.email,
        run: () => {
          navigator.clipboard?.writeText(profile.email).then(
            () => toast("Email copied"),
            () => toast(profile.email)
          );
        },
      },
      { id: "theme", group: "Actions", label: theme === "dark" ? "Switch to light mode" : "Switch to dark mode", icon: theme === "dark" ? <FiSun /> : <FiMoon />, run: toggleTheme },
      { id: "resume", group: "Actions", label: "Download résumé", icon: <FiDownload />, run: () => window.open(profile.resume, "_blank") },
      { id: "read-blog", group: "Links", label: "Read the blog", icon: <FiBookOpen />, run: () => router.push("/blog/") },
      { id: "github", group: "Links", label: "GitHub", icon: <FiGithub />, run: () => window.open(profile.socials.github, "_blank", "noopener") },
      { id: "linkedin", group: "Links", label: "LinkedIn", icon: <FiLinkedin />, run: () => window.open(profile.socials.linkedin, "_blank", "noopener") },
      { id: "mail", group: "Links", label: "Send an email", icon: <FiMail />, run: () => (window.location.href = `mailto:${profile.email}`) },
    ];
  }, [theme, toggleTheme, toast, router]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? items.filter((i) => i.label.toLowerCase().includes(q) || i.group.toLowerCase().includes(q)) : items;
  }, [items, query]);

  // Reset and focus each time the menu opens
  useEffect(() => {
    if (!open) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- resetting the search when the menu reopens
    setQuery("");
    setActive(0);
    const id = window.setTimeout(() => inputRef.current?.focus(), 10);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.clearTimeout(id);
      document.body.style.overflow = prev;
    };
  }, [open]);

  const choose = (item: Item | undefined) => {
    if (!item) return;
    onClose();
    // Let the menu close before scrolling or opening links
    window.setTimeout(item.run, 60);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") onClose();
    else if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => (a + 1) % Math.max(filtered.length, 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => (a - 1 + filtered.length) % Math.max(filtered.length, 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      choose(filtered[active]);
    }
  };

  let lastGroup = "";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="cmd-overlay"
          onMouseDown={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          <motion.div
            className="cmd"
            role="dialog"
            aria-modal="true"
            aria-label="Command menu"
            onMouseDown={(e) => e.stopPropagation()}
            onKeyDown={onKeyDown}
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="cmd__input">
              <FiSearch aria-hidden="true" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActive(0);
                }}
                placeholder="Where to? Type a command or search…"
                aria-label="Search commands"
                role="combobox"
                aria-expanded="true"
                aria-controls="cmd-list"
                aria-activedescendant={filtered[active] ? `cmd-${filtered[active].id}` : undefined}
              />
              <span className="kbd">Esc</span>
            </div>
            <div className="cmd__list" id="cmd-list" role="listbox">
              {filtered.length === 0 && <p className="cmd__empty">Nothing matches “{query}”.</p>}
              {filtered.map((item, i) => {
                const header = item.group !== lastGroup ? <p className="cmd__group">{item.group}</p> : null;
                lastGroup = item.group;
                return (
                  <div key={item.id}>
                    {header}
                    <button
                      id={`cmd-${item.id}`}
                      className="cmd__item"
                      role="option"
                      aria-selected={i === active}
                      onMouseEnter={() => setActive(i)}
                      onClick={() => choose(item)}
                    >
                      {item.icon}
                      {item.label}
                      {item.hint && <span className="kbd">{item.hint}</span>}
                    </button>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
