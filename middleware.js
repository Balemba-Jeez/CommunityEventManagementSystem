import { NextResponse } from "next/server";

// This middleware runs on every request (you can filter with "matcher" if needed)
export function middleware(req) {
  const res = NextResponse.next();

  // Add CORS headers
  res.headers.set("Access-Control-Allow-Origin", "*"); // allow all origins
  res.headers.set("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: res.headers });
  }

  return res;
}

// Optional: only apply middleware to /api/*
export const config = {
  matcher: "/api/:path*",
};
