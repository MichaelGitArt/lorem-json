import type { RequestHandler } from 'express'
import { Piece } from '../db/models/piece'
import { decodeJWT } from '../helpers/jwt'
import { failedResponse } from './shared'

export const getPieces: RequestHandler = async(req, res) => {
  const { token } = req.body
  const tokenData = decodeJWT(token) as any

  if (!tokenData)
    return failedResponse(res)

  const pieces = await Piece.find({
    user: tokenData.userId,
  })

  return res.json({
    data: pieces,
  })
}

export const createPiece: RequestHandler = async(req, res) => {
  const { name, json, token } = req.body

  if (!name || !json || !token)
    return failedResponse(res)

  const tokenData = decodeJWT(token) as any

  const piece = await Piece.create({
    name,
    json,
    user: tokenData.userId,
  })

  return res.json({
    data: piece,
    success: true,
  })
}

export const deletePiece: RequestHandler = async(req, res) => {
  const { id, token } = req.params
  const tokenData = decodeJWT(token) as any

  const { deletedCount } = await Piece.remove({
    _id: id,
    user: tokenData.userId,
  })

  return res.json({
    success: deletedCount > 1,
  })
}

export const getSinglePiece: RequestHandler = async(req, res) => {
  const { id } = req.body
  console.warn('id, ', id)

  const piece = await Piece.findOne({
    _id: id,
  })

  return res.json({
    data: piece,
    success: true,
  })
}
