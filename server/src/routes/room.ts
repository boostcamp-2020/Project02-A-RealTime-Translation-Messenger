import express from 'express';

import roomController from '../controllers/room';

const router = express.Router();

router.get('/', roomController.getPublicRooms);
router.post('/', roomController.createRoom);
router.get('/participants/:roomCode', roomController.getParticipants);

export default router;
