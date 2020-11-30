import { Request, Response } from 'express';

import validationUtil from '../utils/validation';
import StatusCode from '../@types/statusCode';
import joinService from '../services/joinService';

const joinRoom = async (req: Request, res: Response) => {
  const { roomCode, isPrivate } = req.body;

  if (!validationUtil.isIsPrivateValid(isPrivate)) {
    return res.status(StatusCode.CLIENT_ERROR).json();
  }

  try {
    if (await validationUtil.isRoomValid(roomCode, isPrivate)) {
      const createdRoomInfo = await joinService.getRoomInfo(roomCode, isPrivate);
      return res.status(StatusCode.OK).json(createdRoomInfo);
    } else {
      return res.status(StatusCode.NOT_ACCEPTABLE).json();
    }
  } catch (err) {
    return res.status(StatusCode.SERVER_ERROR).json();
  }
};

const joinController = {
  joinRoom,
};

export default joinController;
