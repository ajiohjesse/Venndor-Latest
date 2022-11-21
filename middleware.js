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
    return NextResponse.redirect(new URL('/auth/login', req.nextUrl))
  }

  /**
   * Dont login if user is already
   * logged in.
   */
  if (isLoggedIn && url.includes('/auth/login')) {
    return NextResponse.redirect(new URL('/dashboard/profile', req.nextUrl))
  }

  /**
   * Dont access store page if user
   * hasnt created a store.
   */
  if (url.includes('/dashboard/myStore')) {
    const { data, error } = await client.query({
      query: GET_CURRENT_USER,
      variables: {
        username,
      },
      fetchPolicy: 'network-only',
    })

    if (data.account.store === null) {
      return NextResponse.redirect(
        new URL('/dashboard/createStore', req.nextUrl),
      )
    }

    if (error) {
      console.log({
        name: 'Error in middleware',
        description: 'Happened while trying to validate myStore route',
        error: error,
      })

      return NextResponse.redirect(new URL('/', req.nextUrl))
    }
  }

  /**
   * Dont access create store page if user
   * already has a store.
   */

  if (url.includes('/dashboard/createStore')) {
    const { data, error } = await client.query({
      query: GET_CURRENT_USER,
      variables: {
        username,
      },
      fetchPolicy: 'network-only',
    })

    if (data.account.store !== null) {
      return NextResponse.redirect(new URL('/dashboard/myStore', req.nextUrl))
    }

    if (error) {
      console.log({
        name: 'Error in middleware',
        description: 'Happened while trying to validate create store route',
        error: error,
      })

      return NextResponse.redirect(new URL('/', req.nextUrl))
    }
  }
}

// .then(({ data }) => {
//   if (data.account.store === null) {
//     return NextResponse.redirect(
//       new URL('/dashboard/createStore', req.nextUrl),
//     )
//   }
// })
// .catch((error) => {
//   console.log({
//     name: 'Error in middleware',
//     description: 'Happened while trying to validate myStore route',
//     error: error,
//   })

//   return NextResponse.redirect(new URL('/', req.nextUrl))
// })

// .then(({ data }) => {
//   if (data.account.store !== null) {
//     return NextResponse.redirect(
//       new URL('/dashboard/myStore', req.nextUrl),
//     )
//   }
// })
// .catch((error) => {
//   console.log({
//     name: 'Error in middleware',
//     description: 'Happened while trying to validate create store route',
//     error: error,
//   })

//   return NextResponse.redirect(new URL('/', req.nextUrl))
// })
