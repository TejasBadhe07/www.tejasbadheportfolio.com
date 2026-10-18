"use client";

import { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import { FiBookOpen } from "react-icons/fi";
import { education, experience } from "@/data/site";
import { Reveal, SectionHead } from "./ui";

export default function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  // The coloured line grows as you scroll through the timeline
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });

  return (
    <section className="section container" id="work">
      <SectionHead eyebrow="02 · experience" title="Where I've worked" sub="Full-stack product work with a machine learning core." />

      <div className="timeline" ref={ref}>
        <div className="timeline__rail" aria-hidden="true">
          <motion.div className="timeline__rail-fill" style={{ scaleY: scrollYProgress }} />
        </div>

        {experience.map((job, i) => (
          <Reveal key={job.company} as="article" className="card job" delay={i * 0.05} spot>
            <span className="job__dot" aria-hidden="true" />
            <div className="job__top">
              <div>
                <h3 className="job__title">{job.title}</h3>
                <p className="job__company">
                  {job.company} <span style={{ color: "var(--faint)" }}>· {job.location}</span>
                </p>
              </div>
              <span className="job__period">{job.period}</span>
            </div>
            <p className="job__summary">{job.summary}</p>
            <ul className="job__points">
              {job.points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
            <div className="tags">
              {job.tech.map((t) => (
                <span className="chip" key={t}>
                  {t}
                </span>
              ))}
            </div>
          </Reveal>
        ))}

        <Reveal className="card edu">
          <span className="job__dot" aria-hidden="true" style={{ top: "50%", marginTop: "-0.45rem" }} />
          <span className="edu__name">
            <FiBookOpen aria-hidden="true" /> {education.degree}
          </span>
          <span className="job__period">
            {education.period} · {education.location}
          </span>
        </Reveal>
      </div>
    </section>
  );
}
