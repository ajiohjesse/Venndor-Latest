import * as jose from 'jose'

/**
 *
 * @param token
 * @returns username
 */
const verifyToken = async (token) => {
  let username

  try {
    const { payload: user } = await jose.jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT),
    )

    username = user.username
  } catch (error) {
    username = null
  }

  return username
}

export default verifyToken
