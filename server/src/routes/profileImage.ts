import express from 'express';

import profileImageController from '../controllers/profileImage';

const router = express.Router();

router.get('/', profileImageController.getRandomProfileImageLink);

export default router;
