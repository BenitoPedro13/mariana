import { NextResponse, type NextRequest } from "next/server";

/**
 * `/pilha?f=07` → the prerendered `/f/07`, keeping the address as typed. The Pile
 * then renders on its seventh print on the server, without JavaScript.
 */
export function proxy(request: NextRequest) {
  const f = request.nextUrl.searchParams.get("f");
  if (!f || !/^\d{2,3}$/.test(f)) return NextResponse.next();
  const url = request.nextUrl.clone();
  url.pathname = `/f/${f}`;
  url.search = "";
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: "/pilha",
};
