import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

// The `i.` monogram from app/icon.svg, as the PNG iOS and link previews ask for.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
  const svg = await readFile(join(process.cwd(), "app/icon.svg"), "base64");
  return new ImageResponse(
    <img src={`data:image/svg+xml;base64,${svg}`} width={180} height={180} alt="" />,
    size,
  );
}
