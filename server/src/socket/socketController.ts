import SocketIO, { Socket } from 'socket.io';

import socketService from './socketService';
import socketRoomModel from '../models/socketRoomModel';
import roomSocketsInfoModel from '../models/roomSocketsInfoModel';
import roomInfoModel from '../models/roomInfoModel';
import { UserDataType, SendChatType } from '../types/socketTypes';

const enterChatroom = async (socket: Socket, io: SocketIO.Server, userData: UserDataType) => {
  const { roomCode, nickname, language } = userData;
  socket.join(roomCode);
  await socketService.insertSocketInfoIntoDB(socket.id, roomCode, nickname, language);
  const participantsList = await socketService.getParticipantsListFromRoomCode(roomCode, 'enter');
  io.to(roomCode).emit('receive participants list', participantsList);
};

const sendChat = async (socket: Socket, io: SocketIO.Server, sendChat: SendChatType) => {
  const { Korean, English } = sendChat;
  const { roomCode, receiveChat } = await socketService.createReceiveChatType(socket.id, Korean, English);
  io.to(roomCode).emit('receive chat', receiveChat);
};

const disconnect = async (socket: Socket, io: SocketIO.Server) => {
  const roomCode: string = await socketRoomModel.getRoomBySocket(socket.id);
  await socketService.removeSocketInfoFromDB(socket.id, roomCode);

  if (await roomSocketsInfoModel.isRoomEmpty(roomCode)) {
    await roomInfoModel.removeRoom(roomCode);
    return;
  }

  const participantsList = await socketService.getParticipantsListFromRoomCode(roomCode, 'leave');
  io.to(roomCode).emit('receive participants list', participantsList);
};

const socketControllers = {
  enterChatroom,
  sendChat,
  disconnect,
};

export default socketControllers;
