import roomInfoModel from '../models/roomInfoModel';

export const getRandomCode = async () => {
  let roomCode: string;

  while (true) {
    roomCode = Math.random().toString(36).substr(2, 4).toUpperCase();
    if (!(await roomInfoModel.isRoomCodeExisting(roomCode))) break;
  }

  return roomCode;
};
