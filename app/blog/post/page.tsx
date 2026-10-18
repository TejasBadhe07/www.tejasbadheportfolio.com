import type { Metadata } from "next";
import { Suspense } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Article from "@/components/Article";

export const metadata: Metadata = { title: "Blog post" };

export default function PostPage() {
  return (
    <>
      <Header home={false} />
      <main id="main">
        <Suspense fallback={<div className="article" />}>
          <Article />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
