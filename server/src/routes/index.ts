import express from 'express';

import roomRouter from './room';
import joinRouter from './join';

const router = express.Router();

router.use('/room', roomRouter);
router.use('/join', joinRouter);

export default router;
