import JWT from 'jsonwebtoken'

export const createJWT = ({ user }: { user: any }) => {
  try {
    return JWT.sign({
      userId: user._id.toString(),
    }, process.env.JWT_KEY as string)
  }
  catch (error) {
    return null
  }
}

export const decodeJWT = (token: string) => {
  try {
    return JWT.verify(token, process.env.JWT_KEY as string)
  }
  catch (error) {
    return null
  }
}
