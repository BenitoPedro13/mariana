import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, DM_Mono, Schibsted_Grotesk } from "next/font/google";

import { FlashLayer } from "@/components/pile/flash-layer";
import { FLASH_STORAGE_KEY } from "@/lib/flash-key";

import "./globals.css";

// Only `latin` is preloaded; other ranges load if a caption ever needs them.
const bodoni = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
  axes: ["opsz"],
});

// The diary home doesn't use it; the pages that do fetch it on first use.
const schibsted = Schibsted_Grotesk({
  variable: "--font-schibsted",
  subsets: ["latin"],
  preload: false,
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: { default: "anairam", template: "anairam — %s" },
  description: "fotos da Mariana.",
  // Protected preview until Mariana says yes (CLAUDE.md §4).
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#0e0b0f",
};

// Runs before first paint on a full load, so nothing flashes in before its
// entrance. On the diary home (`/`) the preloader holds the page; on the Pile
// (`/pilha`) the first exposure develops it out of the flash. Both are skipped
// for reduced motion; the Pile's also for "desligar flash".
const exposureScript = `(function(){try{var d=document.documentElement,p=location.pathname;if(matchMedia("(prefers-reduced-motion: reduce)").matches)return;if(p==="/"){d.classList.add("diario-loading");return}if(p!=="/pilha")return;if(localStorage.getItem(${JSON.stringify(FLASH_STORAGE_KEY)})==="off")return;d.classList.add("first-exposure")}catch(e){}})()`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${bodoni.variable} ${schibsted.variable} ${dmMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: exposureScript }} />
      </head>
      <body data-surface="night" suppressHydrationWarning>
        {children}
        <FlashLayer />
      </body>
    </html>
  );
}
