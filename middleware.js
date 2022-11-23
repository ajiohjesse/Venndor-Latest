import { NextResponse } from 'next/server'
import * as jose from 'jose'

export async function middleware(req) {
  const token = req.cookies.get('VenndorUser')

  const url = req.url

  let isLoggedIn
  let username

  try {
    const { payload: user } = await jose.jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT),
    )

    username = user.username
    isLoggedIn = true
  } catch (error) {
    isLoggedIn = false
  }

  /**
   * Redirect user to login page
   * if not logged in.
   */
  if (!isLoggedIn && url.includes('/dashboard')) {
    return NextResponse.redirect(new URL('/auth/login', req.nextUrl))
  }

  /**
   * Dont login if user is already
   * logged in.
   */
  if (isLoggedIn && url.includes('/auth/login')) {
    return NextResponse.redirect(new URL('/dashboard/profile', req.nextUrl))
  }

  return NextResponse.next()
}
