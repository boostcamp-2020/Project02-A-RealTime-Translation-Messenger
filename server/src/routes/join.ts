import express, { Request, Response } from 'express';
import roomInfoModel from '../models/roomInfoModel';
import { CreatedRoomType } from '../types/socketTypes';
import { isRoomCodeValidate } from '../utils/validate';

const router = express.Router();

router.post('/private', async (req: Request, res: Response) => {
  const { roomCode } = req.body;

  if (await isRoomCodeValidate(roomCode, 'private')) {
    const title = await roomInfoModel.getTitle(roomCode);
    const createdRoom: CreatedRoomType = { roomCode, title, isPrivate: 'true' };
    return res.status(200).json(createdRoom);
  }

  return res.status(400).json();
});

router.post('/public', async (req: Request, res: Response) => {
  const { roomCode } = req.body;

  if (await isRoomCodeValidate(roomCode, 'public')) {
    const title = await roomInfoModel.getTitle(roomCode);
    const createdRoom: CreatedRoomType = { roomCode, title, isPrivate: 'false' };
    return res.status(200).json(createdRoom);
  }

  return res.status(400).json();
});

export default router;
