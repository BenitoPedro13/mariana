import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, DM_Mono, Schibsted_Grotesk } from "next/font/google";

import { FlashLayer } from "@/components/pile/flash-layer";
import { FLASH_STORAGE_KEY } from "@/lib/flash-key";

import "./globals.css";

const bodoni = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin", "latin-ext"],
  axes: ["opsz"],
});

const schibsted = Schibsted_Grotesk({
  variable: "--font-schibsted",
  subsets: ["latin", "latin-ext"],
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin", "latin-ext"],
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

// Runs before first paint on a full load of the home: hides the pile so the
// first exposure can develop it out of the flash. Skipped for reduced motion
// and for "desligar flash".
const exposureScript = `(function(){try{if(location.pathname!=="/")return;if(matchMedia("(prefers-reduced-motion: reduce)").matches)return;if(localStorage.getItem(${JSON.stringify(FLASH_STORAGE_KEY)})==="off")return;document.documentElement.classList.add("first-exposure")}catch(e){}})()`;

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
