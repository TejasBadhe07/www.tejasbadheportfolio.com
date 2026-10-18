"use client";

import { useEffect, useState } from "react";
import { FiMapPin } from "react-icons/fi";
import { profile, projects } from "@/data/site";
import { Reveal, SectionHead } from "./ui";

function PuneTime() {
  const [time, setTime] = useState<string | null>(null);
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-IN", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "Asia/Kolkata" });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = window.setInterval(tick, 15000);
    return () => window.clearInterval(id);
  }, []);
  return <>{time ?? "--:--"}</>;
}

export default function About() {
  const featured = projects.find((p) => p.featured);

  return (
    <section className="section container" id="about">
      <SectionHead eyebrow="01 · about" title={<>Engineer by trade, <span className="gradient-text">builder</span> by habit.</>} />

      <div className="bento">
        <Reveal className="card bento__photo">
          {/* eslint-disable-next-line @next/next/no-img-element -- static export, images are already sized */}
          <img src="/images/tejas.webp" alt="Tejas Badhe sitting outdoors" loading="lazy" />
          <span className="bento__photo-tag">
            <FiMapPin /> {profile.location}
          </span>
        </Reveal>

        <Reveal className="card bento__text" delay={0.05} spot>
          {profile.about.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </Reveal>

        <Reveal className="card bento__stat" spot delay={0.1}>
          <span className="bento__stat-value gradient-text">2022</span>
          <span className="bento__stat-label">Shipping production software since</span>
        </Reveal>
        <Reveal className="card bento__stat" spot delay={0.15}>
          <span className="bento__stat-value">{projects.length}</span>
          <span className="bento__stat-label">Projects on this page, web to computer vision</span>
        </Reveal>

        <Reveal className="card bento__stat bento__stat--wide" spot delay={0.2}>
          <span className="bento__stat-value">
            <PuneTime />
          </span>
          <span className="bento__stat-label">My local time (IST)</span>
        </Reveal>

        <Reveal className="card bento__terminal" spot delay={0.1}>
          <div className="terminal__bar" aria-hidden="true">
            <i />
            <i />
            <i />
            <span>~/tejas — zsh</span>
          </div>
          <pre className="terminal__body">
            <span className="t-prompt">❯</span> whoami --json{"\n"}
            {"{"}
            {"\n  "}
            <span className="t-key">&quot;name&quot;</span>: <span className="t-str">&quot;{profile.name}&quot;</span>,{"\n  "}
            <span className="t-key">&quot;role&quot;</span>: <span className="t-str">&quot;{profile.role}&quot;</span>,{"\n  "}
            <span className="t-key">&quot;stack&quot;</span>: [<span className="t-str">&quot;Python&quot;</span>, <span className="t-str">&quot;React&quot;</span>, <span className="t-str">&quot;Next.js&quot;</span>],{"\n  "}
            <span className="t-key">&quot;ml&quot;</span>: [<span className="t-str">&quot;TensorFlow&quot;</span>, <span className="t-str">&quot;OpenCV&quot;</span>],{"\n  "}
            <span className="t-key">&quot;open_to&quot;</span>: <span className="t-str">&quot;interesting problems&quot;</span>
            {"\n}"}
          </pre>
        </Reveal>

        {featured && (
          <Reveal className="card bento__now" spot delay={0.15}>
            <span className="label-row">
              <span className="pulse-dot" /> Currently building
            </span>
            <h3>{featured.title}</h3>
            <p>{featured.tagline}. Booking sites, admin and a channel manager for Airbnb and MakeMyTrip.</p>
            <a href="#projects" className="link-arrow" style={{ marginTop: "auto" }}>
              See the project →
            </a>
          </Reveal>
        )}
      </div>
    </section>
  );
}
