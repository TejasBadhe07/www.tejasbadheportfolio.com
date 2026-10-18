"use client";

import { useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { FiGithub, FiExternalLink, FiLock } from "react-icons/fi";
import { projects, type Project } from "@/data/site";
import { Reveal, SectionHead, spotlight } from "./ui";

const categories = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];

// Booking-calendar pattern for the HostTerrace preview: b = booked, s = synced from Airbnb/MMT, c = closed
const calendar = "..bb.ss.bbb..c..sss.bb...ccbb..ss.b".split("");

function HostTerraceMock() {
  return (
    <div className="mock" aria-hidden="true">
      <div className="mock__bar">
        <i />
        <i />
        <i />
        <span className="mock__url">hostterrace · admin</span>
      </div>
      <div className="mock__body">
        <div className="mock__side">
          <span />
          <span />
          <span style={{ width: "80%" }} />
          <span style={{ width: "60%" }} />
          <span />
          <span style={{ width: "70%" }} />
        </div>
        <div className="mock__main">
          <div className="mock__stats">
            <div className="mock__stat">
              <b className="mock__bar-line" />
              <small>villas</small>
            </div>
            <div className="mock__stat">
              <b className="mock__bar-line" />
              <small>bookings</small>
            </div>
            <div className="mock__stat">
              <b className="mock__bar-line" />
              <small>channels</small>
            </div>
          </div>
          <div className="mock__cal">
            {calendar.map((c, i) => (
              <motion.span
                key={i}
                className={c === "b" ? "is-booked" : c === "s" ? "is-synced" : c === "c" ? "is-closed" : ""}
                initial={{ opacity: 0, scale: 0.6 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.015, duration: 0.3 }}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="mock__sync">
        <span className="pulse-dot" /> Synced with Airbnb · MakeMyTrip
      </div>
    </div>
  );
}

function Links({ p }: { p: Project }) {
  if (!p.github && !p.demo) {
    return (
      <span className="chip">
        <FiLock style={{ marginRight: 6 }} /> Private code
      </span>
    );
  }
  return (
    <>
      {p.github && (
        <a className="btn btn--sm" href={p.github} target="_blank" rel="noopener noreferrer">
          <FiGithub /> Code
        </a>
      )}
      {p.demo && (
        <a className="btn btn--sm btn--primary" href={p.demo} target="_blank" rel="noopener noreferrer">
          <FiExternalLink /> Live
        </a>
      )}
    </>
  );
}

// Card that tilts toward the mouse in 3D
function ProjectCard({ p }: { p: Project }) {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(my, [0, 1], [7, -7]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(mx, [0, 1], [-7, 7]), { stiffness: 200, damping: 20 });

  return (
    <motion.article
      layout
      className="card project spotlight"
      style={reduce ? undefined : { rotateX, rotateY, transformPerspective: 900 }}
      onMouseMove={(e) => {
        spotlight(e);
        const r = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width);
        my.set((e.clientY - r.top) / r.height);
      }}
      onMouseLeave={() => {
        mx.set(0.5);
        my.set(0.5);
      }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="project__media">
        {/* eslint-disable-next-line @next/next/no-img-element -- static export, images are pre-sized */}
        {p.image && <img src={p.image} alt={`${p.title} screenshot`} loading="lazy" />}
        <span className="project__cat">{p.category}</span>
      </div>
      <div className="project__body">
        <h3 className="project__title">{p.title}</h3>
        <p className="project__tagline">{p.tagline}</p>
        <p className="project__desc">{p.description}</p>
        <div className="tags">
          {p.tech.map((t) => (
            <span key={t} className="chip">
              {t}
            </span>
          ))}
        </div>
        <div className="project__links">
          <Links p={p} />
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState("All");
  const featured = projects.find((p) => p.featured);
  const rest = projects.filter((p) => !p.featured && (filter === "All" || p.category === filter));
  const showFeatured = featured && (filter === "All" || featured.category === filter);

  return (
    <section className="section container" id="projects">
      <SectionHead eyebrow="04 · projects" title={<>Things I&apos;ve <span className="gradient-text">built</span></>} sub="From a multi-company booking platform to neural networks that read handwriting." />

      <div className="filters" role="group" aria-label="Filter projects">
        {categories.map((c) => (
          <button key={c} className="filter" aria-pressed={filter === c} onClick={() => setFilter(c)}>
            {filter === c && <motion.span layoutId="filter-bg" className="filter__bg" transition={{ type: "spring", stiffness: 400, damping: 34 }} />}
            {c}
          </button>
        ))}
      </div>

      {showFeatured && featured && (
        <Reveal className="card featured" spot>
          <HostTerraceMock />
          <div className="featured__body">
            <div className="featured__badges">
              <span className="badge badge--new">NEW</span>
              {featured.status && <span className="badge badge--status">{featured.status}</span>}
            </div>
            <h3 className="featured__title">{featured.title}</h3>
            <p className="featured__tagline">{featured.tagline}</p>
            <p className="featured__desc">{featured.description}</p>
            {featured.highlights && (
              <ul className="featured__list">
                {featured.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            )}
            <div className="tags">
              {featured.tech.map((t) => (
                <span key={t} className="chip">
                  {t}
                </span>
              ))}
            </div>
            <div className="project__links">
              <Links p={featured} />
            </div>
          </div>
        </Reveal>
      )}

      <motion.div layout className="projects">
        <AnimatePresence mode="popLayout">
          {rest.map((p) => (
            <ProjectCard key={p.slug} p={p} />
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
