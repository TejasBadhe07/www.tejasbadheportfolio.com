import type { Document } from "@contentful/rich-text-types";

// Read-only "Content Delivery" key: it can only fetch published posts, so it is safe in the browser.
const SPACE = "jkv5apjobcxc";
const TOKEN = "VzLYrSLXdiOvmIIgIrfFecTeOeoo0KW0k_ObY-C5_Lo";
const BASE = `https://cdn.contentful.com/spaces/${SPACE}/environments/master`;

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime?: number;
  cover?: string;
  content?: Document;
};

type Asset = { sys: { id: string }; fields: { file?: { url?: string } } };
type Entry = {
  sys: { id: string };
  fields: {
    title: string;
    excerpt?: string;
    publishedDate?: string;
    readTime?: number;
    coverImage?: { sys: { id: string } };
    content?: Document;
  };
};

// Posts are addressed by their title turned into a URL, same as the old site, so old links keep working
export const slugify = (title: string) =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export async function getPosts(limit?: number): Promise<Post[]> {
  const params = new URLSearchParams({
    access_token: TOKEN,
    content_type: "tejasPortfolioBlogPost",
    order: "-fields.publishedDate",
    include: "1",
  });
  if (limit) params.set("limit", String(limit));
  const res = await fetch(`${BASE}/entries?${params}`);
  if (!res.ok) throw new Error(`Blog request failed (${res.status})`);
  const data: { items: Entry[]; includes?: { Asset?: Asset[] } } = await res.json();
  const assets = new Map((data.includes?.Asset ?? []).map((a) => [a.sys.id, a.fields.file?.url]));

  return data.items.map((item) => {
    const url = item.fields.coverImage ? assets.get(item.fields.coverImage.sys.id) : undefined;
    return {
      slug: slugify(item.fields.title),
      title: item.fields.title,
      excerpt: item.fields.excerpt ?? "",
      date: item.fields.publishedDate ?? "",
      readTime: item.fields.readTime,
      cover: url ? (url.startsWith("//") ? `https:${url}` : url) : undefined,
      content: item.fields.content,
    };
  });
}

export const formatDate = (iso: string) =>
  iso ? new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "";
