import SocketIO, { Socket } from 'socket.io';

import { UserDataType, SendChatType } from '../types/socketTypes';
import socketService from './socketService';

const enterChatroom = async (socket: Socket, io: SocketIO.Server, userData: UserDataType) => {
  const { roomCode, nickname, language } = userData;
  socket.join(roomCode);
  const renewedParticipants = await socketService.enterChatRoom(socket.id, roomCode, nickname, language);
  io.to(roomCode).emit('receive participants list', renewedParticipants);
};

const sendChat = async (socket: Socket, io: SocketIO.Server, sendChat: SendChatType) => {
  const { Korean, English } = sendChat;
  const { roomCode, receiveChat } = await socketService.sendChat(socket.id, Korean, English);
  io.to(roomCode).emit('receive chat', receiveChat);
};

const disconnect = async (socket: Socket, io: SocketIO.Server) => {
  const { roomCode, renewedParticipants } = await socketService.disconnect(socket.id);
  if (renewedParticipants) {
    io.to(roomCode).emit('receive participants list', renewedParticipants);
  }
};

const socketControllers = {
  enterChatroom,
  sendChat,
  disconnect,
};

export default socketControllers;
