import { defineConfig } from "astro/config";
import partytown from "@astrojs/partytown";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";

export default defineConfig({
  site: "https://sergiomarquez.dev/",
  output: "static",
  integrations: [
    sitemap({
      filter: (page) => !page.includes("/_"),
    }),
    partytown({
      config: {
        forward: ["dataLayer.push"],
        debug: false,
      },
    }),
    tailwind(),
  ],
  compressHTML: true,
  trailingSlash: "never",
  build: {
    inlineStylesheets: "auto",
  },
  image: {
    // Opciones de optimización de imágenes
    service: {
      entrypoint: "astro/assets/services/sharp",
    },
    domains: [], // Dominios permitidos para imágenes externas
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.sergiomarquez.dev",
      },
    ],
  },
  vite: {
    build: {
      cssMinify: "lightningcss",
      assetsInlineLimit: 4096,
      minify: "terser",
      terserOptions: {
        compress: {
          drop_console: true,
        },
      },
      rollupOptions: {
        output: {
          entryFileNames: "entry.[hash].js",
          chunkFileNames: "chunks/chunk.[hash].js",
          assetFileNames: "assets/asset.[hash][extname]",
          manualChunks: (id) => {
            if (id.includes("node_modules")) {
              return "vendor";
            }
          },
        },
      },
    },
    ssr: {
      noExternal: ["@astrojs/*"],
    },
    // Optimización de cache en desarrollo
    optimizeDeps: {
      exclude: [],
    },
  },
  // Configuración de Content Collections (descomentar si se utilizan)
  // experimental: {
  //     contentCollections: true,
  // },
});
