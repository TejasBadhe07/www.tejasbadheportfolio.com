"use client";

import { profile } from "@/data/site";
import { useUI } from "./Providers";

export default function Footer() {
  const { openMenu } = useUI();
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <span>
          © {new Date().getFullYear()} {profile.name}. Built with Next.js, Three.js and too much chai.
        </span>
        <span className="footer__right">
          <button onClick={openMenu} className="link-arrow" style={{ fontFamily: "inherit", fontSize: "inherit" }}>
            Press <span className="kbd">⌘K</span> to navigate
          </button>
        </span>
      </div>
    </footer>
  );
}
