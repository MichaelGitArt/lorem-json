import { Router } from 'express';

import { getPieces } from './controllers/piece';

const router = Router();

router.get('/', getPieces);

export {
  router
}