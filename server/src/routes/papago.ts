import express from 'express';

import papagoController from '../controllers/papagoController';

const router = express.Router();

router.post('/detection', papagoController.detection);
router.post('/translation', papagoController.translation);

export default router;
