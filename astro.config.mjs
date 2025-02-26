import { defineConfig } from "astro/config";
import partytown from "@astrojs/partytown";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
    site: "https://sergiomarquez.dev/",
    integrations: [
        sitemap({
            i18n: {
                defaultLocale: 'es',
                locales: {
                    es: 'es-ES',
                    en: 'en-US',
                }
            },
            filter: (page) => !page.includes('/_'),
        }),
        partytown({
            config: {
                forward: ["dataLayer.push"],
            },
        }),
    ],
    compressHTML: true,
    build: {
        inlineStylesheets: "auto",
    },
    image: {
        // Opciones de optimización de imágenes
        service: {
            entrypoint: 'astro/assets/services/sharp',
        },
        domains: [], // Dominios permitidos para imágenes externas
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**.sergiomarquez.dev',
            },
        ],
    },
    vite: {
        build: {
            cssMinify: "lightningcss",
            assetsInlineLimit: 4096,
            rollupOptions: {
                output: {
                    entryFileNames: 'entry.[hash].js',
                    chunkFileNames: 'chunks/chunk.[hash].js',
                    assetFileNames: 'assets/asset.[hash][extname]',
                    manualChunks: (id) => {
                        if (id.includes('node_modules')) {
                            return 'vendor';
                        }
                    },
                },
            },
        },
        ssr: {
            noExternal: ['@astrojs/*'],
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
