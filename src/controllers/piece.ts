import { RequestHandler } from 'express';


export const getPieces: RequestHandler = async (req, res) =>{
  return res.json({
    data: []
  })
}