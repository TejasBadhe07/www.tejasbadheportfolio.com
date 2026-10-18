import Link from "next/link";
import { formatDate, type Post } from "@/lib/contentful";

export default function PostCard({ post }: { post: Post }) {
  return (
    <Link href={`/blog/post/?slug=${post.slug}`} className="card post-card">
      <div className="post-card__img">
        {/* eslint-disable-next-line @next/next/no-img-element -- remote Contentful image in a static export */}
        {post.cover && <img src={`${post.cover}?w=800&fm=webp`} alt="" loading="lazy" />}
      </div>
      <div className="post-card__body">
        <span className="post-card__meta">
          {formatDate(post.date)}
          {post.readTime ? ` · ${post.readTime} min read` : ""}
        </span>
        <h3>{post.title}</h3>
        {post.excerpt && <p>{post.excerpt}</p>}
      </div>
    </Link>
  );
}
