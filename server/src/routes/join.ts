import express from 'express';

import joinController from '../controllers/joinController';

const router = express.Router();

router.post('/private', joinController.joinPrivateRoom);
router.post('/public', joinController.joinPublicRoom);

export default router;
