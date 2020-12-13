import { Request, Response } from 'express';

import validationUtil from '../utils/validation';
import StatusCode from '../@types/statusCode';
import joinService from '../services/joinService';
import roomSocketsInfoModel from '../models/roomSocketsInfoModel';

const joinRoom = async (req: Request, res: Response) => {
  const { roomCode, isPrivate } = req.body;

  if (!validationUtil.isIsPrivateValid(isPrivate)) {
    return res.status(StatusCode.CLIENT_ERROR).json();
  }

  try {
    if (!(await validationUtil.isRoomValid(roomCode, isPrivate))) return res.status(StatusCode.NOT_ACCEPTABLE).json();

    const count = await roomSocketsInfoModel.getSocketCountByRoom(roomCode);
    if (!validationUtil.isMaxParticipants(count)) return res.status(StatusCode.NOT_ACCEPTABLE).json();

    const createdRoomInfo = await joinService.getRoomInfo(roomCode, isPrivate);
    return res.status(StatusCode.OK).json(createdRoomInfo);
  } catch (err) {
    return res.status(StatusCode.SERVER_ERROR).json();
  }
};

const joinController = {
  joinRoom,
};

export default joinController;
