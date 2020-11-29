import roomInfoModel from '../models/roomInfoModel';
import roomSocketsInfoModel from '../models/roomSocketsInfoModel';
import { ParticipantsType } from '../types/socketTypes';

export const getRandomCode = async () => {
  let roomCode: string;

  while (true) {
    roomCode = Math.random().toString(36).substr(2, 4).toUpperCase();
    if (!(await roomInfoModel.isRoomCodeExisting(roomCode))) break;
  }

  return roomCode;
};

export const getParticipantsListFromRoomCode = async (roomCode: string) => {
  const rawParticipantsData = await roomSocketsInfoModel.getSocketsByRoom(roomCode);
  const participantsList: ParticipantsType[] = Object.entries(rawParticipantsData).map(([key, value]) => {
    const { nickname, language }: { nickname: string; language: string } = JSON.parse(value);
    return { socketId: key, nickname, language };
  });

  return participantsList;
};
