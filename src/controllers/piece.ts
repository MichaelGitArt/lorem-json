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
  const { id, token } = req.body
  const tokenData = decodeJWT(token) as any

  const { deletedCount } = await Piece.remove({
    _id: id,
    user: tokenData.userId,
  })

  return res.json({
    success: deletedCount > 1,
  })
}

export const getPiece: RequestHandler = async(req, res) => {
  const { id } = req.body

  const piece = await Piece
    .findById(id)
    .catch(() => {
    // eslint-disable-next-line no-console
      console.log('Piece not found')
    })

  if (!piece) {
    return res.json({
      success: false,
    })
  }

  return res.json({
    data: piece,
    success: true,
  })
}

export const updatePiece: RequestHandler = async(req, res) => {
  const {
    id,
    token,
    piece,
  } = req.body

  const tokenData = decodeJWT(token) as any

  console.warn('id', id, tokenData)

  const existPiece = await Piece
    .findOne({
      _id: id,
      user: tokenData.userId,
    })
    .catch(() => {
    // eslint-disable-next-line no-console
      console.log('Piece not found')
    })

  if (!existPiece) {
    return res.json({
      success: false,
    })
  }

  existPiece.json = piece.json
  existPiece.name = piece.name

  await existPiece.save()

  return res.json({
    data: existPiece,
    success: true,
  })
}
