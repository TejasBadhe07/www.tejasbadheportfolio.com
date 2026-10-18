"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { getPosts, type Post } from "@/lib/contentful";
import PostCard from "./PostCard";
import { SectionHead } from "./ui";

export default function BlogPreview() {
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    getPosts(3)
      .then(setPosts)
      .catch(() => setFailed(true));
  }, []);

  return (
    <section className="section container" id="blog">
      <SectionHead eyebrow="05 · writing" title="Notes from the workbench" sub="Things I've learned building, written down." />

      {failed ? (
        <div className="card empty-note">The blog couldn&apos;t load right now. Please try again later.</div>
      ) : posts === null ? (
        <div className="posts" aria-busy="true">
          {[0, 1, 2].map((i) => (
            <div key={i} className="card skeleton" />
          ))}
        </div>
      ) : posts.length === 0 ? (
        <div className="card empty-note">New posts are on the way.</div>
      ) : (
        <div className="posts">
          {posts.map((p) => (
            <PostCard key={p.slug} post={p} />
          ))}
        </div>
      )}

      <div className="section-foot">
        <Link href="/blog/" className="link-arrow">
          All posts <FiArrowRight />
        </Link>
      </div>
    </section>
  );
}
