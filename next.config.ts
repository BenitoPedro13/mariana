import type { NextConfig } from "next";

import { indexable } from "./lib/site";

const nextConfig: NextConfig = {
  // Until indexing is on (lib/site.ts), every response says noindex, so the
  // photos, optimised images and preview cards stay out of search too, not
  // just the HTML.
  async headers() {
    if (indexable) return [];
    return [
      {
        source: "/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow, noimageindex" }],
      },
    ];
  },
};

export default nextConfig;
