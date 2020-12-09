import express from 'express';

import roomRouter from './room';
import joinRouter from './join';
import profileImageRouter from './profileImage';
import papagoRouter from './papago';

const router = express.Router();

router.use('/room', roomRouter);
router.use('/join', joinRouter);
router.use('/profileImage', profileImageRouter);
router.use('/papago', papagoRouter);

export default router;
