import express from 'express';

import joinController from '../controllers/joinController';

const router = express.Router();

router.post('/', joinController.joinRoom);

export default router;
