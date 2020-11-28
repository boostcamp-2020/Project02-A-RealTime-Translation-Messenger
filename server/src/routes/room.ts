import express, { Request, Response } from 'express';
import roomInfoModel from '../models/roomInfoModel';
import roomSocketsInfoModel from '../models/roomSocketsInfoModel';
import { CreatedRoomType, RoomInfoType, RoomListType } from '../types/socketTypes';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const roomCodeList = await roomInfoModel.getRoomCodeList();

    const roomInfos: RoomInfoType[] = [];
    for (const roomCode of roomCodeList) {
      roomInfos.push(await roomInfoModel.getRoomInfo(roomCode));
    }

    const roomLists: RoomListType[] = [];
    for (const roomInfo of roomInfos) {
      const key = roomInfo.roomCode;
      const count = await roomSocketsInfoModel.getSocketCountByRoom(key);
      roomLists.push({ ...roomInfo, participantCount: count });
    }

    const filteredRoomLists = roomLists.filter((room) => {
      if (room.isPrivate === 'false') return true;
      return false;
    });

    return res.status(200).json({ roomList: filteredRoomLists });
  } catch (err) {
    return res.status(400).json();
  }
});

router.post('/', async (req: Request, res: Response) => {
  const title = req.body.title;
  const isPrivate = req.body.isPrivate;

  const getRandomCode = () => {
    return Math.random().toString(36).substr(2, 4).toUpperCase();
  };

  let roomCode: string;
  while (true) {
    roomCode = getRandomCode();
    if (!(await roomInfoModel.isRoomCodeExisting(roomCode))) break;
  }

  if (await roomInfoModel.setRoom(roomCode, title, isPrivate)) {
    const createdRoom: CreatedRoomType = { roomCode, title, isPrivate };
    return res.status(200).json(createdRoom);
  }

  return res.status(400).json();
});

export default router;
