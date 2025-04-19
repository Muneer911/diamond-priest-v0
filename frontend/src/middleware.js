import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("access_token");

  console.log("✅ Middleware is running! URL:", req.nextUrl.pathname);
  console.log("Token:", token);

  // Allow _rsc requests to pass through
  if (req.nextUrl.searchParams.has("_rsc")) {
    return NextResponse.next();
  }

  if (!token) {
    // Redirect to the signin page if no token is found
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  return NextResponse.next(); // Allow the request to proceed
}

export const config = {
  matcher: ["/dashboard/:path*"], // Protect /dashboard and all subroutes
};
