
import type { RequestHandler } from 'express'
import { Piece } from '../db/models/piece'

export const getPiece: RequestHandler = async(req, res) => {
  const { id } = req.params
  console.warn('id, ', id)

  const piece = await Piece.findOne({
    _id: id,
  })

  return res.json({
    data: JSON.parse(piece.json),
  })
}
