import express, { Request, Response } from 'express';
import roomInfoModel from '../models/roomInfoModel';
import { createdRoomType } from '../types/socketTypes';

const router = express.Router();

router.post('/private', async (req: Request, res: Response) => {
  const roomCode = req.body.roomCode;

  if (/[A-Z0-9]{4}/.test(roomCode)) {
    if ((await roomInfoModel.isRoomCodeExisting(roomCode)) && (await roomInfoModel.isRoomPrivate(roomCode))) {
      const title: string = await roomInfoModel.getTitle(roomCode);
      const createdRoom: createdRoomType = { roomCode, title, isPrivate: 'true' };
      return res.status(200).json(createdRoom);
    }
  }
  return res.status(400);
});

router.post('/public', async (req: Request, res: Response) => {
  const roomCode = req.body.roomCode;

  if (/[A-Z0-9]{4}/.test(roomCode)) {
    if ((await roomInfoModel.isRoomCodeExisting(roomCode)) && !(await roomInfoModel.isRoomPrivate(roomCode))) {
      const title: string = await roomInfoModel.getTitle(roomCode);
      const createdRoom: createdRoomType = { roomCode, title, isPrivate: 'false' };
      return res.status(200).json(createdRoom);
    }
  }
  return res.status(400);
});
