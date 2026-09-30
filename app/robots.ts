import type { MetadataRoute } from "next";

import { indexable, SITE_URL } from "@/lib/site";

// Link-preview fetchers read the card and the title for a shared link; they
// don't index. Some (Twitterbot) draw no card at all if robots.txt shuts them out.
const PREVIEW_BOTS = [
  "Twitterbot",
  "facebookexternalhit",
  "Slackbot-LinkExpanding",
  "LinkedInBot",
  "WhatsApp",
  "TelegramBot",
  "Discordbot",
];

// Closed to every other crawler until Mariana says yes and wants to be found
// (lib/site.ts). Open, it still keeps them out of the lab and the /f/… copies
// of the Pile.
export default function robots(): MetadataRoute.Robots {
  if (!indexable) {
    return {
      rules: [
        { userAgent: PREVIEW_BOTS, allow: "/" },
        { userAgent: "*", disallow: "/" },
      ],
    };
  }
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/lab", "/f/"] },
    sitemap: new URL("/sitemap.xml", SITE_URL).href,
  };
}
