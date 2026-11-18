import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ThemeProvider from "./components/ThemeProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://samielimam.com";
const TITLE = "Sami El-Imam — Software Engineer";
const DESCRIPTION =
  "Computer Engineering graduate from the University of Waterloo. Full-stack software engineer building production systems end-to-end.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Sami El-Imam",
    title: TITLE,
    description: DESCRIPTION,
    // og:image comes from app/opengraph-image.tsx
  },
  // Next copies every Open Graph field into twitter:* unless told otherwise.
  // X/Twitter falls back to og:image on its own, so an empty images array
  // suppresses the six duplicated twitter:image* tags. twitter:title and
  // twitter:description are still auto-filled by Next and cannot be turned
  // off through the Metadata API.
  twitter: {
    card: "summary_large_image",
    images: [],
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Sami El-Imam",
  url: SITE_URL,
  jobTitle: "Software Engineer",
  worksFor: { "@type": "Organization", name: "Shoplogix" },
  alumniOf: { "@type": "CollegeOrUniversity", name: "University of Waterloo" },
  sameAs: [
    "https://github.com/selimam2",
    "https://www.linkedin.com/in/sami-el-imam-b4bb33a6/",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* Sections fade in via JS; without JS they would stay invisible. */}
        <noscript>
          <style>{`.fade-in{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-300">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
