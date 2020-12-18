import { Request, Response } from 'express';

import validationUtil from '../utils/validation';
import StatusCode from '../@types/statusCode';
import joinService from '../services/join';
import socketsInRoom from '../models/socketsInRoom';
import RoomInfo from '../@types/roomInfo';

const joinRoom = async (req: Request, res: Response) => {
  const { roomCode, isPrivate } = req.body;

  if (!validationUtil.isValidRoomDisclosureStatus(isPrivate)) {
    return res.status(StatusCode.CLIENT_ERROR).json();
  }

  try {
    if (!(await validationUtil.isValidRoom(roomCode, isPrivate))) return res.status(StatusCode.NOT_ACCEPTABLE).json();
    if ((await socketsInRoom.getSocketCountInRoom(roomCode)) >= RoomInfo.MAX_PARTICIPANTS)
      return res.status(StatusCode.NOT_ACCEPTABLE).json();

    const room = await joinService.getRoom(roomCode, isPrivate);
    return res.status(StatusCode.OK).json(room);
  } catch (err) {
    return res.status(StatusCode.SERVER_ERROR).json();
  }
};

const joinController = {
  joinRoom,
};

export default joinController;
