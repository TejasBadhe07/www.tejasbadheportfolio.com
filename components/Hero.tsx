"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "framer-motion";
import { FiArrowDownRight, FiDownload, FiGithub, FiLinkedin, FiInstagram } from "react-icons/fi";
import { profile } from "@/data/site";
import { useUI } from "./Providers";

// The 3D scene only runs in the browser and loads after the text is visible
const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

const hasWebGL = () => {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
};

function Typewriter({ words }: { words: string[] }) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [text, setText] = useState(reduce ? words[0] : "");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reduce) return;
    const word = words[index % words.length];
    const done = !deleting && text === word;
    const empty = deleting && text === "";
    const delay = done ? 1800 : empty ? 300 : deleting ? 35 : 70;
    const id = window.setTimeout(() => {
      if (done) setDeleting(true);
      else if (empty) {
        setDeleting(false);
        setIndex((i) => i + 1);
      } else setText(word.slice(0, text.length + (deleting ? -1 : 1)));
    }, delay);
    return () => window.clearTimeout(id);
  }, [text, deleting, index, words, reduce]);

  return (
    <p className="hero__role" aria-label={words.join(", ")}>
      <span aria-hidden="true">
        <span style={{ color: "var(--faint)" }}>&gt; </span>
        {text}
        <span className="caret" />
      </span>
    </p>
  );
}

const rise = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.9, delay: 0.15 + i * 0.1, ease: [0.22, 1, 0.36, 1] as const } }),
};

export default function Hero() {
  const { theme } = useUI();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(true);
  const [webgl, setWebgl] = useState<boolean | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- feature check that can only run in the browser
    setWebgl(hasWebGL());
    const el = ref.current;
    if (!el) return;
    // Stop drawing the 3D scene while it is scrolled out of view
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="hero" id="top" ref={ref}>
      <div className="hero__canvas">
        {webgl === true && <HeroScene theme={theme} paused={!inView || !!reduce} />}
        {webgl === false && <div className="hero__fallback" aria-hidden="true" />}
      </div>

      <div className="container hero__inner">
        <div className="hero__content">
          <motion.p className="hero__hello" variants={rise} initial="hidden" animate="show" custom={0}>
            <span>~/</span>hello-world <span>·</span> based in {profile.location}
          </motion.p>
          <h1 className="hero__title">
            <motion.span className="line" variants={rise} initial="hidden" animate="show" custom={1}>
              Tejas
            </motion.span>
            <motion.span className="line gradient-text" variants={rise} initial="hidden" animate="show" custom={2}>
              Badhe.
            </motion.span>
          </h1>
          <motion.div variants={rise} initial="hidden" animate="show" custom={3}>
            <Typewriter words={profile.roles} />
          </motion.div>
          <motion.p className="hero__intro" variants={rise} initial="hidden" animate="show" custom={4}>
            {profile.intro}
          </motion.p>
          <motion.div className="hero__cta" variants={rise} initial="hidden" animate="show" custom={5}>
            <a href="#projects" className="btn btn--primary">
              See my work <FiArrowDownRight />
            </a>
            <a href={profile.resume} className="btn" target="_blank" rel="noopener">
              Résumé <FiDownload />
            </a>
          </motion.div>
          <motion.div className="hero__socials" variants={rise} initial="hidden" animate="show" custom={6}>
            <a className="icon-btn" href={profile.socials.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <FiGithub />
            </a>
            <a className="icon-btn" href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FiLinkedin />
            </a>
            <a className="icon-btn" href={profile.socials.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FiInstagram />
            </a>
          </motion.div>
        </div>
      </div>

      <a href="#about" className="hero__scroll" aria-label="Scroll to About">
        <span className="hero__mouse" />
        Scroll
      </a>
    </section>
  );
}
