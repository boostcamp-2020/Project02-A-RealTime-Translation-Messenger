import express from 'express';

import profileImageController from '../controllers/profileImageController';

const router = express.Router();

router.get('/', profileImageController.getRandomProfileImageLink);

export default router;
