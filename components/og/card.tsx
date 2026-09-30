import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

import { photos } from "@/content/photos";
import { formatStamp, pad2 } from "@/lib/print";

/*
 * The link-preview card (docs/02-VISUAL-IDENTITY.md §7). Set like the diary's
 * chrome: the header's two columns and squares, the wordmark with its magenta
 * tittle, the footer's `anairam ——— mariana ■`, the counter and the date stamp.
 *
 * No photo, on purpose: a preview is a copy in someone else's cache, out of
 * reach of a takedown, and reference photos must never ship
 * (docs/tasks/TASK-og-and-seo.md). When Mariana picks the photo for it, it
 * goes in here.
 *
 * Satori has no CSS variables, so the palette is restated from
 * app/globals.css under its semantic names.
 */

const room = "#0e0b0f"; // --noite
const ink = "#f6f3ee"; // --flash
const inkQuiet = "#8a8386"; // --asfalto
const mark = "#98003b"; // --vdv, the tittle and nothing else
const stamp = "#f2c200"; // --taxi, the date stamp and nothing else

export const OG_SIZE = { width: 1200, height: 630 };

const fonts = Promise.all(
  ["BodoniModa-opsz96-Medium.ttf", "DMMono-Regular.ttf"].map((file) =>
    readFile(join(process.cwd(), "assets/fonts", file)),
  ),
);

const years = photos.map((p) => p.date.slice(0, 4)).sort();
const span = years[0] === years.at(-1) ? years[0] : `${years[0]} — ${years.at(-1)}`;
const newest = photos.map((p) => p.date).sort().at(-1)!;

/** The home card, or one photo's: its counter and its date stamp. */
export async function ogCard(photo?: { index: number; date: string }) {
  const [bodoni, mono] = await fonts;
  const counter = photo
    ? `${pad2(photo.index + 1)} / ${pad2(photos.length)}`
    : `${photos.length} fotos`;
  const date = photo?.date ?? newest;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "44px 56px 40px",
          background: room,
          color: ink,
          fontFamily: "DM Mono",
          fontSize: 22,
          lineHeight: 1.3,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div style={{ display: "flex", flexDirection: "column", color: inkQuiet }}>
            <span>fotografia</span>
            <span>diário com flash</span>
          </div>
          {/* Her two moods: a Noite square and a Flash one. */}
          <div style={{ display: "flex", gap: 10, paddingTop: 4 }}>
            <div style={{ width: 18, height: 18, border: `1px solid ${ink}`, background: room }} />
            <div style={{ width: 18, height: 18, background: ink }} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", color: inkQuiet }}>
            <span>diário</span>
            <span>{span}</span>
          </div>
        </div>

        <Wordmark size={272} />

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <span>anairam</span>
            <div style={{ flexGrow: 1, height: 1, background: ink }} />
            <span>mariana</span>
            <div style={{ width: 12, height: 12, background: ink }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ color: inkQuiet }}>{counter}</span>
            <span style={{ color: stamp, letterSpacing: 1 }}>{formatStamp(date)}</span>
          </div>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: "Bodoni Moda", data: bodoni, weight: 500, style: "normal" },
        { name: "DM Mono", data: mono, weight: 400, style: "normal" },
      ],
    },
  );
}

/** `anairam` in Bodoni Moda 500 at opsz 96; the `i`'s tittle in Magenta VDV. */
function Wordmark({ size }: { size: number }) {
  return (
    <div
      style={{
        display: "flex",
        fontFamily: "Bodoni Moda",
        fontSize: size,
        lineHeight: 1,
        marginLeft: -size * 0.04,
      }}
    >
      <span>ana</span>
      <div style={{ display: "flex", position: "relative" }}>
        <span>i</span>
        {/* The same `i` in magenta, clipped to its top: the Monogram's trick. */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: size * 0.36,
            overflow: "hidden",
            display: "flex",
            color: mark,
          }}
        >
          <span>i</span>
        </div>
      </div>
      <span>ram</span>
    </div>
  );
}
