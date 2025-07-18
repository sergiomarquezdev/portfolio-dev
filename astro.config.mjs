import { defineConfig } from "astro/config";
import partytown from "@astrojs/partytown";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";

import preact from "@astrojs/preact";

export default defineConfig({
  site: "https://cv.sergiomarquez.dev/",
  output: "static",
  trailingSlash: "never",
  compressHTML: true,

  integrations: [
    sitemap(),
    partytown({
      config: {
        forward: ["dataLayer.push"],
      },
    }),
    tailwind({
      applyBaseStyles: false,
    }),
    preact(),
  ],

  image: {
    service: {
      entrypoint: "astro/assets/services/sharp",
    },
  },

  prefetch: {
    prefetchAll: false,
    defaultStrategy: "hover",
  },

  vite: {
    build: {
      cssMinify: "lightningcss",
    },
  },
});
