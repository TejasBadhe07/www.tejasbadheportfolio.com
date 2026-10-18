"use client";

import { useEffect, useState } from "react";
import { getPosts, type Post } from "@/lib/contentful";
import PostCard from "./PostCard";
import { SectionHead } from "./ui";

export default function BlogList() {
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    getPosts()
      .then(setPosts)
      .catch(() => setFailed(true));
  }, []);

  return (
    <>
      <SectionHead eyebrow="blog" title="Writing" sub="Notes on building software, machine learning and shipping products." />
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
    </>
  );
}
