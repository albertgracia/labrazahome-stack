import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://stack-2026.vercel.app",
  integrations: [react(), sitemap()],
  output: "static",
  server: { port: 4321 },
});
