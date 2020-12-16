import express from 'express';

import papagoController from '../controllers/papago';

const router = express.Router();

router.post('/detection', papagoController.detection);
router.post('/translation', papagoController.translation);

export default router;
