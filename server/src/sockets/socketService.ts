import roomSocketsInfoModel from '../models/roomSocketsInfoModel';
import socketRoomModel from '../models/socketRoomModel';
import dateUtil from '../utils/date';
import { ReceiveChatType, ParticipantsType } from '../@types/dataType';
import { Socket } from 'socket.io';

const getParticipantsListFromRoomCode = async (roomCode: string, type: string) => {
  const rawParticipantsData = await roomSocketsInfoModel.getSocketsByRoom(roomCode);
  const participantsList: ParticipantsType[] = Object.entries(rawParticipantsData).map(([key, value]) => {
    const { nickname, language }: { nickname: string; language: string } = JSON.parse(value);
    return { socketId: key, nickname, language };
  });

  return {
    participantsList: participantsList,
    type,
  };
};

const insertSocketInfoIntoDB = async (socketId: string, roomCode: string, nickname: string, language: string) => {
  await roomSocketsInfoModel.setSocketInfo(roomCode, socketId, JSON.stringify({ nickname, language }));
  await socketRoomModel.setRoomBySocket(socketId, roomCode);
  return true;
};

const createReceiveChatType = async (socketId: string, Korean: string, English: string) => {
  const roomCode = await socketRoomModel.getRoomBySocket(socketId);

  const socketInfo = await roomSocketsInfoModel.getSocketInfo(roomCode, socketId);
  const { nickname }: { nickname: string } = JSON.parse(socketInfo);

  const receiveChat: ReceiveChatType = {
    Korean,
    English,
    senderId: socketId,
    nickname,
    createdAt: dateUtil.getNow(),
  };

  return { roomCode, receiveChat };
};

const removeSocketInfoFromDB = async (socketId: string, roomCode: string) => {
  await roomSocketsInfoModel.removeSocketByRoom(roomCode, socketId);
  await socketRoomModel.removeSocket(socketId);
  return true;
};

const emitSocketError = (socket: Socket, errorMessage: string) => {
  socket.emit('socket error', JSON.stringify({ errorMessage }));
};

const socketService = {
  getParticipantsListFromRoomCode,
  insertSocketInfoIntoDB,
  createReceiveChatType,
  removeSocketInfoFromDB,
  emitSocketError,
};

export default socketService;
