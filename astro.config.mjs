import { defineConfig } from "astro/config";
import partytown from "@astrojs/partytown";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
    site: "https://sergiomarquez.dev/",
    integrations: [
        sitemap(),
        partytown({
            config: {
                forward: ["dataLayer.push"],
            },
        }),
    ],
});
