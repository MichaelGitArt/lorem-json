import { Schema, model } from 'mongoose'

const pieceSchema = new Schema({
  name: String,
  json: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
})

export const Piece = model('Piece', pieceSchema)
