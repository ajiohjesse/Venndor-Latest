import { NextResponse } from "next/server";
import * as jose from "jose";

export default async function middleware(req) {
  const token = req.cookies.get("VenndorUser");
  const url = req.url;
  let isLoggedIn;

  try {
    await jose.jwtVerify(token, new TextEncoder().encode(process.env.JWT));

    isLoggedIn = true;
  } catch (error) {
    isLoggedIn = false;
  }

  if (!isLoggedIn && url.includes("/dashboard")) {
    return NextResponse.rewrite(new URL("/auth/login", req.nextUrl));
  }

  if (isLoggedIn && url.includes("/auth/login")) {
    return NextResponse.rewrite(new URL("/dashboard/profile", req.nextUrl));
  }
}
