import { NextResponse } from "next/server";
import Cookies from "js-cookie";

export function middleware(req) {
  const token = req.cookies.get("access_token");

  console.log("✅ Middleware is running! URL:", req.nextUrl.pathname);
  console.log("Token:", token);

  if (!token) {
    // Redirect to the signin page if no token is found
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  Cookies.set("access_token", token, {
    path: "/",
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  return NextResponse.next(); // Allow the request to proceed
}

export const config = {
  matcher: ["/dashboard"], // Protect the /dashboard route
};
