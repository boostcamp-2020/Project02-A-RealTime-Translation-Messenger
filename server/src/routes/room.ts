import express, { Request, Response } from 'express';
import roomInfoModel from '../models/roomInfoModel';
import roomSocketsInfoModel from '../models/roomSocketsInfoModel';
import { CreatedRoomType, RoomInfoType, RoomListType } from '../types/socketTypes';
import { getRandomCode } from '../utils/room';
import { StatusCode } from '../types/statusCode';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const roomCodeList = await roomInfoModel.getRoomCodeList();

    const roomInfos: RoomInfoType[] = await Promise.all(
      roomCodeList.map(async (roomCode) => await roomInfoModel.getRoomInfo(roomCode)),
    );

    const roomLists = await Promise.all(
      roomInfos.map(async (roomInfo) => {
        const key = roomInfo.roomCode;
        const count = await roomSocketsInfoModel.getSocketCountByRoom(key);
        return { ...roomInfo, participantCount: count };
      }),
    );

    const filteredRoomLists = roomLists.filter((room) => room.isPrivate === 'false');

    return res.status(StatusCode.OK).json({ roomList: filteredRoomLists });
  } catch (err) {
    return res.status(StatusCode.CLIENT_ERROR).json();
  }
});

router.post('/', async (req: Request, res: Response) => {
  const { title, isPrivate } = req.body;
  try {
    const roomCode = await getRandomCode();

    if (await roomInfoModel.setRoom(roomCode, title, isPrivate)) {
      const createdRoom: CreatedRoomType = { roomCode, title, isPrivate };
      return res.status(StatusCode.OK).json(createdRoom);
    }
  } catch (err) {
    return res.status(StatusCode.CLIENT_ERROR).json();
  }
});

export default router;
