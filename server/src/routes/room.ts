import express from 'express';

import roomController from '../controllers/room';

const router = express.Router();

router.get('/', roomController.getPublicRooms);
router.post('/', roomController.createRoom);
router.get('/participantsList/:roomCode', roomController.getParticipantsList);

export default router;
