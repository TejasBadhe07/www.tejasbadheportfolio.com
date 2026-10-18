"use client";

import { useEffect, useMemo, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { FiLayout, FiServer, FiCpu, FiCloud } from "react-icons/fi";
import { skillGroups } from "@/data/site";
import { Reveal, SectionHead } from "./ui";

const icons = [<FiLayout key="f" />, <FiServer key="b" />, <FiCpu key="a" />, <FiCloud key="s" />];

// A sphere of skill names built with CSS 3D transforms; drag or hover to spin it
function TagSphere({ tags }: { tags: string[] }) {
  const wrap = useRef<HTMLDivElement>(null);
  const items = useRef<(HTMLSpanElement | null)[]>([]);
  const reduce = useReducedMotion();

  // Spread points evenly on a sphere (Fibonacci lattice)
  const points = useMemo(
    () =>
      tags.map((_, i) => {
        const y = 1 - (i / (tags.length - 1)) * 2;
        const r = Math.sqrt(1 - y * y);
        const theta = Math.PI * (3 - Math.sqrt(5)) * i;
        return { x: Math.cos(theta) * r, y, z: Math.sin(theta) * r };
      }),
    [tags]
  );

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    let ax = 0.15;
    let ay = 0;
    let vx = 0.002;
    let vy = 0.004;
    let raf = 0;
    let visible = true;

    const draw = () => {
      const radius = el.offsetWidth / 2;
      const [sx, cx, sy, cy] = [Math.sin(ax), Math.cos(ax), Math.sin(ay), Math.cos(ay)];
      points.forEach((p, i) => {
        const node = items.current[i];
        if (!node) return;
        // rotate around Y, then X
        const x1 = p.x * cy + p.z * sy;
        const z1 = -p.x * sy + p.z * cy;
        const y2 = p.y * cx - z1 * sx;
        const z2 = p.y * sx + z1 * cx;
        const depth = (z2 + 1) / 2; // 0 back … 1 front
        node.style.transform = `translate(-50%, -50%) translate3d(${x1 * radius}px, ${y2 * radius}px, ${z2 * radius}px) scale(${0.65 + depth * 0.55})`;
        node.style.opacity = String(0.25 + depth * 0.75);
        node.style.zIndex = String(Math.round(depth * 100));
      });
    };

    const loop = () => {
      if (visible) {
        ax += vx;
        ay += vy;
        // ease back to the idle spin after a drag
        vx += (0.002 - vx) * 0.02;
        vy += (0.004 - vy) * 0.02;
        draw();
      }
      raf = requestAnimationFrame(loop);
    };

    draw();
    if (reduce) return;
    raf = requestAnimationFrame(loop);

    let dragging = false;
    let lx = 0;
    let ly = 0;
    const down = (e: PointerEvent) => {
      dragging = true;
      lx = e.clientX;
      ly = e.clientY;
    };
    const move = (e: PointerEvent) => {
      if (!dragging) return;
      vy = (e.clientX - lx) * 0.002;
      vx = -(e.clientY - ly) * 0.002;
      lx = e.clientX;
      ly = e.clientY;
    };
    const up = () => (dragging = false);
    el.addEventListener("pointerdown", down);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting));
    io.observe(el);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      el.removeEventListener("pointerdown", down);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
  }, [points, reduce]);

  return (
    <div className="tag-sphere" ref={wrap} aria-hidden="true" style={{ cursor: "grab", touchAction: "pan-y" }}>
      {tags.map((t, i) => (
        <span
          key={t}
          className="tag-sphere__item"
          ref={(n) => {
            items.current[i] = n;
          }}
          style={{ color: i % 3 === 0 ? "var(--accent-2)" : i % 3 === 1 ? "var(--text)" : "var(--accent)" }}
        >
          {t}
        </span>
      ))}
    </div>
  );
}

export default function Skills() {
  const all = skillGroups.flatMap((g) => g.skills);

  return (
    <section className="section container" id="skills">
      <SectionHead eyebrow="03 · skills" title="The toolbox" sub="What I reach for, from the first sketch to production. Drag the sphere to spin it." />
      <div className="skills">
        <Reveal className="card skills__orb">
          <TagSphere tags={all} />
        </Reveal>
        <div className="skills__groups">
          {skillGroups.map((g, i) => (
            <Reveal key={g.title} className="card skill-group" delay={i * 0.06} spot>
              <div className="skill-group__icon" aria-hidden="true">
                {icons[i]}
              </div>
              <h3>{g.title}</h3>
              <p>{g.blurb}</p>
              <ul>
                {g.skills.map((s) => (
                  <li key={s} className="chip">
                    {s}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
