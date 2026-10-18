"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { FiArrowLeft } from "react-icons/fi";
import { formatDate, getPosts, type Post } from "@/lib/contentful";

export default function Article() {
  const params = useSearchParams();
  const [post, setPost] = useState<Post | null | undefined>(undefined);

  useEffect(() => {
    // New links use ?slug=…; old links were /blog/<slug> and are served this page by the host
    const fromPath = window.location.pathname.replace(/\/+$/, "").split("/").pop();
    const slug = params.get("slug") || (fromPath && fromPath !== "post" && fromPath !== "blog" ? fromPath : "");
    getPosts()
      .then((posts) => {
        const found = posts.find((p) => p.slug === slug) ?? null;
        setPost(found);
        if (found) document.title = `${found.title} | Tejas Badhe`;
      })
      .catch(() => setPost(null));
  }, [params]);

  return (
    <article className="article">
      <Link href="/blog/" className="link-arrow article__back">
        <FiArrowLeft /> All posts
      </Link>
      {post === undefined && <div className="card skeleton" />}
      {post === null && <p className="empty-note">This post couldn&apos;t be found.</p>}
      {post && (
        <>
          <h1>{post.title}</h1>
          <p className="article__meta">
            {formatDate(post.date)}
            {post.readTime ? ` · ${post.readTime} min read` : ""}
          </p>
          {post.cover && (
            <div className="article__cover">
              {/* eslint-disable-next-line @next/next/no-img-element -- remote Contentful image in a static export */}
              <img src={`${post.cover}?w=1400&fm=webp`} alt="" />
            </div>
          )}
          <div className="prose">{post.content ? documentToReactComponents(post.content) : <p>{post.excerpt}</p>}</div>
        </>
      )}
    </article>
  );
}
