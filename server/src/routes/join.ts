import express, { Request, Response } from 'express';

import roomInfoModel from '../models/roomInfoModel';
import validationUtils from '../utils/validation';
import { StatusCode } from '../types/statusCode';
import { CreatedRoomType } from '../types/socketTypes';

const router = express.Router();

router.post('/private', async (req: Request, res: Response) => {
  const { roomCode } = req.body;

  if (await validationUtils.isRoomCodeValid(roomCode, 'private')) {
    const title = await roomInfoModel.getTitle(roomCode);
    const createdRoom: CreatedRoomType = { roomCode, title, isPrivate: 'true' };
    return res.status(StatusCode.OK).json(createdRoom);
  }

  return res.status(StatusCode.CLIENT_ERROR).json();
});

router.post('/public', async (req: Request, res: Response) => {
  const { roomCode } = req.body;

  if (await validationUtils.isRoomCodeValid(roomCode, 'public')) {
    const title = await roomInfoModel.getTitle(roomCode);
    const createdRoom: CreatedRoomType = { roomCode, title, isPrivate: 'false' };
    return res.status(StatusCode.OK).json(createdRoom);
  }

  return res.status(StatusCode.CLIENT_ERROR).json();
});

export default router;
