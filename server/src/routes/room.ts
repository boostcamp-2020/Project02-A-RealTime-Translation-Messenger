import express from 'express';

import roomController from '../controllers/roomController';

const router = express.Router();

router.get('/', roomController.getPublicRoomList);
router.post('/', roomController.createRoom);

export default router;
