import { Router } from 'express'

import { createPiece, deletePiece, getPieces, getSinglePiece } from './controllers/piece'

const router = Router()

router.get('/', (req, res) => {
  res.send(`
    <a href="/pieces">Pieces</a>
  `)
})

router.get('/pieces', getPieces)

router.post('/pieces', createPiece)

router.get('/pieces/:id', getSinglePiece)

router.delete('/pieces/:id', deletePiece)

export {
  router,
}
