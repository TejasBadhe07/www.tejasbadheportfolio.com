import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main" className="container" style={{ minHeight: "100svh", display: "grid", placeItems: "center", textAlign: "center" }}>
      <div>
        <p className="eyebrow" style={{ justifyContent: "center" }}>404</p>
        <h1 className="section-title">This page wandered off.</h1>
        <p className="section-sub">Let&apos;s get you back to something real.</p>
        <Link href="/" className="btn btn--primary" style={{ marginTop: "2rem" }}>
          Go home
        </Link>
      </div>
    </main>
  );
}
