"use client";

import { FiMail, FiCopy, FiGithub, FiLinkedin, FiInstagram } from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";
import { profile } from "@/data/site";
import { useUI } from "./Providers";
import { Reveal } from "./ui";

export default function Contact() {
  const { toast } = useUI();

  const copy = () =>
    navigator.clipboard?.writeText(profile.email).then(
      () => toast("Email copied"),
      () => toast(profile.email)
    );

  return (
    <section className="section container" id="contact">
      <Reveal className="card contact" spot>
        <p className="eyebrow">06 · contact</p>
        <h2 className="contact__title">
          Have an idea? <span className="gradient-text">Let&apos;s build it.</span>
        </h2>
        <p className="contact__sub">
          Whether it&apos;s a product, a platform or a machine learning problem, my inbox is open. I usually reply within a day or two.
        </p>
        <div className="contact__actions">
          <a className="btn btn--primary" href={`mailto:${profile.email}`}>
            <FiMail /> {profile.email}
          </a>
          <button className="btn" onClick={copy}>
            <FiCopy /> Copy email
          </button>
        </div>
        <div className="contact__socials">
          <a className="icon-btn" href={profile.socials.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <FiGithub />
          </a>
          <a className="icon-btn" href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <FiLinkedin />
          </a>
          <a className="icon-btn" href={profile.socials.x} target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)">
            <FaXTwitter />
          </a>
          <a className="icon-btn" href={profile.socials.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <FiInstagram />
          </a>
        </div>
      </Reveal>
    </section>
  );
}
