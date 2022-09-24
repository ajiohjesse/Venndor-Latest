import * as cookie from 'cookie'
import verifyToken from '../lib/verifyToken'

const Test = ({ username }) => {
  const getData = async () => {
    const { data } = await axios.get('/api/user')
    console.log(data)
  }

  console.log(username)

  return (
    <div>
      test page
      <button onClick={getData}>Get user</button>
    </div>
  )
}

export default Test

export const getServerSideProps = async (context) => {
  const Token = cookie.parse(context.req.headers.cookie).VenndorUser

  const username = await verifyToken(Token)

  return {
    props: {
      username,
    },
  }
}
