import { Request, Response } from 'express';

import validationUtil from '../utils/validation';
import StatusCode from '../@types/statusCode';
import joinService from '../services/joinService';

const joinPrivateRoom = async (req: Request, res: Response) => {
  const { roomCode } = req.body;

  if (await validationUtil.isRoomCodeValid(roomCode, 'private')) {
    const createdRoomInfo = await joinService.getRoomInfo(roomCode, 'true');
    return res.status(StatusCode.OK).json(createdRoomInfo);
  }

  return res.status(StatusCode.CLIENT_ERROR).json();
};

const joinPublicRoom = async (req: Request, res: Response) => {
  const { roomCode } = req.body;

  if (await validationUtil.isRoomCodeValid(roomCode, 'public')) {
    const createdRoomInfo = await joinService.getRoomInfo(roomCode, 'false');
    return res.status(StatusCode.OK).json(createdRoomInfo);
  }

  return res.status(StatusCode.CLIENT_ERROR).json();
};

const joinController = {
  joinPrivateRoom,
  joinPublicRoom,
};

export default joinController;
