import express from 'express';

import roomRouter from './room';
import joinRouter from './join';
import profileImageRouter from './profileImage';

const router = express.Router();

router.use('/room', roomRouter);
router.use('/join', joinRouter);
router.use('/profileImage', profileImageRouter);

export default router;
