// eslint-disable-next-line @next/next/no-server-import-in-page
import type { NextRequest } from "next/server";
// eslint-disable-next-line @next/next/no-server-import-in-page
import { NextResponse } from "next/server";

export const config = {
  runtime: "experimental-edge",
  matcher: ["/api/work", "/api/work/:id*"],
};

export async function middleware(request: NextRequest) {
  if (process.env.apiKey === request.headers.get("app-api-key")) {
    return NextResponse.next();
  }

  request.nextUrl.searchParams.set("from", request.nextUrl.pathname);
  request.nextUrl.pathname = "/404";

  return NextResponse.redirect(request.nextUrl);
}
