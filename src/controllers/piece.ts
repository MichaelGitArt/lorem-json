import type { RequestHandler } from 'express'
import { Piece } from '../db/models/piece'

export const getPieces: RequestHandler = async(req, res) => {
  const pieces = await Piece.find()

  return res.json({
    data: pieces,
  })
}

export const createPiece: RequestHandler = async(req, res) => {
  const { name, json } = req.body

  if (!name || !json) {
    res.json({
      success: false,
    })
    return
  }

  const piece = await Piece.create({
    name,
    json,
  })

  return res.json({
    data: piece,
    success: true,
  })
}

export const deletePiece: RequestHandler = async(req, res) => {
  const { id } = req.params
  console.warn('id, ', id)

  const { deletedCount } = await Piece.remove({
    _id: id,
  })

  return res.json({
    success: deletedCount > 1,
  })
}

export const getSinglePiece: RequestHandler = async(req, res) => {
  const { id } = req.params
  console.warn('id, ', id)

  const piece = await Piece.findOne({
    _id: id,
  })

  return res.json({
    data: piece,
    success: true,
  })
}
