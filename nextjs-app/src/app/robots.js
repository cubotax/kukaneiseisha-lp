export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
        disallow: "/aircon-diagnosis",
    },
    sitemap: "https://kukaneiseisha.com/sitemap.xml",
    host: "https://kukaneiseisha.com",
  };
}
