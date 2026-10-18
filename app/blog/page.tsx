import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlogList from "@/components/BlogList";

export const metadata: Metadata = { title: "Blog" };

export default function BlogPage() {
  return (
    <>
      <Header home={false} />
      <main id="main" className="container section" style={{ paddingTop: "8rem" }}>
        <BlogList />
      </main>
      <Footer />
    </>
  );
}
