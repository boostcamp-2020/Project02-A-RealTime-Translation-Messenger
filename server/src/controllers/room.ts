import { Request, Response } from 'express';

import roomGroup from '../models/roomGroup';
import roomCodeUtil from '../utils/roomCode';
import StatusCode from '../@types/statusCode';
import roomService from '../services/room';
import validationUtil from '../utils/validation';
import socketService from '../sockets/socketService';
import RoomInfo from '../@types/roomInfo';

const getPublicRooms = async (req: Request, res: Response) => {
  try {
    const roomCodes = await roomGroup.getRoomCodes();
    const rooms = await roomService.getRooms(roomCodes);
    const filteredRooms = rooms.filter((room) => room.isPrivate === RoomInfo.PUBLIC);

    return res.status(StatusCode.OK).json({ rooms: filteredRooms });
  } catch (err) {
    return res.status(StatusCode.SERVER_ERROR).json();
  }
};

const createRoom = async (req: Request, res: Response) => {
  const { title, isPrivate } = req.body;
  if (!(validationUtil.isValidTitle(title) && validationUtil.isValidRoomDisclosureStatus(isPrivate)))
    return res.status(StatusCode.CLIENT_ERROR).json();

  try {
    const roomCode = await roomCodeUtil.getRandomCode();
    await roomGroup.saveRoom(roomCode, title, isPrivate);
    const createdRoom = { roomCode, title, isPrivate };
    return res.status(StatusCode.OK).json(createdRoom);
  } catch (err) {
    return res.status(StatusCode.SERVER_ERROR).json();
  }
};

const getParticipantsList = async (req: Request, res: Response) => {
  const roomCode = req.params.roomCode;
  if (!validationUtil.isValidRoomCode(roomCode)) return res.status(StatusCode.CLIENT_ERROR).json();
  try {
    const participants = await socketService.getParticipants(roomCode);
    return res.status(StatusCode.OK).json({ participants });
  } catch (err) {
    return res.status(StatusCode.SERVER_ERROR).json();
  }
};

const roomController = {
  getPublicRooms,
  createRoom,
  getParticipantsList,
};

export default roomController;
