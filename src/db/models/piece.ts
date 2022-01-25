import { Schema, model } from 'mongoose'

const pieceSchema = new Schema({
  name: String,
  json: String,
})

export const Piece = model('Piece', pieceSchema)
