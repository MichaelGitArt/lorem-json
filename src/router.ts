import { Router } from 'express'

import * as pieceController from './controllers/piece'
import * as authController from './controllers/auth'
import * as apiController from './controllers/api'

const router = Router()

router.get('/', (req, res) => {
  res.send(`
    <a href="/pieces">Pieces</a>
  `)
})

// External usage roues
router.get('/api/piece/:id', apiController.getPiece)

// Service routes
router.post('/get-pieces', pieceController.getPieces)
router.post('/create-piece', pieceController.createPiece)
router.delete('/delete-piece/:id', pieceController.deletePiece)
router.get('/get-piece/:id', pieceController.getSinglePiece)

router.post('/login', authController.login)
router.post('/register', authController.register)

export {
  router,
}
