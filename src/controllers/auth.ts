import type { RequestHandler } from 'express'
import bcrypt from 'bcrypt'
import { User } from '../db/models/user'
import { createJWT } from '../helpers/jwt'

export const login: RequestHandler = async(req, res) => {
  const { username, password } = req.body

  const returnFalse = () => {
    return res.json({
      success: false,
    })
  }

  if (!username || !password)
    return returnFalse()

  const user = await User.findOne({
    username,
  })

  if (!user)
    return returnFalse()

  const isPasswordRight = bcrypt.compareSync(password, user.password)

  if (!isPasswordRight)
    return returnFalse()

  const token = createJWT({ user })

  return res.json({
    data: {
      token,
      user,
    },
    success: true,
  })
}

export const register: RequestHandler = async(req, res) => {
  const { username, password } = req.body
  if (!username || !password) {
    return res.json({
      success: false,
    })
  }

  const hashedPassword = bcrypt.hashSync(password, parseInt(process.env.HASH_SALT_ROUND as string))

  const user = await User.create({
    username,
    password: hashedPassword,
  })

  const token = createJWT({ user })

  return res.json({
    data: {
      token,
      user,
    },
    success: true,
  })
}
