import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";

const site = process.env.PUBLIC_SITE_URL || "https://stack-2026.vercel.app";

export default defineConfig({
  site,
  integrations: [react(), sitemap()],
  output: "static",
  server: { port: 4321 },
});
