import type { MetadataRoute } from "next";

// lastModified is omitted on purpose: a build-time `new Date()` would claim
// the content changed on every deploy, which it usually hasn't.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://samielimam.com", changeFrequency: "monthly", priority: 1 },
    { url: "https://samielimam.com/game", changeFrequency: "yearly", priority: 0.3 },
  ];
}
