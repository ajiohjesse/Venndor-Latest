import { NextResponse } from 'next/server'
import * as jose from 'jose'
import client from './apollo-client'
import { GET_CURRENT_USER } from './graphql/queries/userQueries'

export default async function middleware(req) {
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
    return NextResponse.rewrite(new URL('/auth/login', req.nextUrl))
  }

  /**
   * Dont login if user is already
   * logged in.
   */
  if (isLoggedIn && url.includes('/auth/login')) {
    return NextResponse.rewrite(new URL('/dashboard/profile', req.nextUrl))
  }

  /**
   * Dont access store page if user
   * hasnt created a store.
   */
  if (url.includes('/dashboard/myStore')) {
    await client
      .query({
        query: GET_CURRENT_USER,
        variables: {
          username,
        },
        fetchPolicy: 'network-only',
      })
      .then(({ data }) => {
        if (!data.account.store) {
          return NextResponse.rewrite(
            new URL('/dashboard/createStore', req.nextUrl),
          )
        }
      })
      .catch((error) => {
        console.log(error)

        return NextResponse.rewrite(new URL('/', req.nextUrl))
      })
  }

  /**
   * Dont access create store page if user
   * already has a store.
   */

  if (url.includes('/dashboard/createStore')) {
    await client
      .query({
        query: GET_CURRENT_USER,
        variables: {
          username,
        },
        fetchPolicy: 'network-only',
      })
      .then(({ data }) => {
        if (data?.account.store) {
          return NextResponse.rewrite(
            new URL('/dashboard/myStore', req.nextUrl),
          )
        }
      })
      .catch((error) => {
        console.log(error)

        return NextResponse.rewrite(new URL('/', req.nextUrl))
      })
  }
}
