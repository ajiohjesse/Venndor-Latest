import * as jose from 'jose'

export default async function handler(req, res) {
  const { cookies } = req

  const token = cookies.VenndorUser

  try {
    const { payload: user } = await jose.jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT),
    )

    res.json(user.username)
  } catch (error) {
    res.json(null)
  }
}
