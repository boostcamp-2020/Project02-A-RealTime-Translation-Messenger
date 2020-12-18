import express from 'express';

import joinController from '../controllers/join';

const router = express.Router();

router.post('/', joinController.joinRoom);

export default router;
