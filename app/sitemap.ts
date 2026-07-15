import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://afsilva.online", lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: "https://afsilva.online/privacidade", lastModified: new Date(), changeFrequency: "yearly", priority: 0.4 },
  ];
}
