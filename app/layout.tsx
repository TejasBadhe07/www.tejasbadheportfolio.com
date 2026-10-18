import type { Metadata, Viewport } from "next";
import "@fontsource-variable/inter";
import "@fontsource-variable/space-grotesk";
import "@fontsource-variable/jetbrains-mono";
import "./globals.css";
import { profile } from "@/data/site";
import Providers from "@/components/Providers";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.tejasbadheportfolio.com"),
  title: {
    default: `${profile.name} | ${profile.role}`,
    template: `%s | ${profile.name}`,
  },
  description:
    "Tejas Badhe, software developer in Pune. Full-stack web platforms, machine learning and computer vision.",
  openGraph: {
    title: `${profile.name} | ${profile.role}`,
    description: profile.intro,
    images: ["/images/tejas-beach.webp"],
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#07080d" },
    { media: "(prefers-color-scheme: light)", color: "#f6f6fb" },
  ],
};

// Sets the theme before the page paints, so there is no flash of the wrong colours
const themeScript = `(function(){try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark'}document.documentElement.setAttribute('data-theme',t)}catch(e){document.documentElement.setAttribute('data-theme','dark')}})()`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <div className="backdrop" aria-hidden="true" />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
