import {
  userDataType,
  participantsType,
  participantsListType,
  sendChatType,
  receiveChatType,
} from '../types/socketTypes';
import SocketIO, { Socket } from 'socket.io';
import moment from 'moment';
import roomInfoModel from '../models/roomInfoModel';
import roomSocketsInfoModel from '../models/roomSocketsInfoModel';
import socketRoomModel from '../models/socketRoomModel';

const enterChatroom = async (socket: Socket, io: SocketIO.Server, userData: userDataType) => {
  const { roomCode, nickname, language } = userData;
  socket.join(roomCode);
  await roomSocketsInfoModel.setSocketInfo(roomCode, socket.id, JSON.stringify({ nickname, language }));
  await socketRoomModel.setRoomBySocket(socket.id, roomCode);

  const rawParticipantsData = await roomSocketsInfoModel.getSocketsByRoom(roomCode);
  const participantsList: participantsType[] = Object.entries(rawParticipantsData).map(([key, value]) => {
    const { nickname, language }: { nickname: string; language: string } = JSON.parse(value);
    return { socketId: key, nickname, language };
  });

  const renewedParticipants: participantsListType = {
    participantsList: participantsList,
    type: 'enter',
  };
  io.to(roomCode).emit('receive participants list', renewedParticipants);
};

const sendChat = async (socket: Socket, io: SocketIO.Server, sendChat: sendChatType) => {
  const { Korean, English } = sendChat;
  const roomCode = await socketRoomModel.getRoomBySocket(socket.id);

  const socketInfo = await roomSocketsInfoModel.getSocketInfo(roomCode, socket.id);
  const { nickname }: { nickname: string } = JSON.parse(socketInfo);

  const receiveChat: receiveChatType = {
    Korean,
    English,
    senderId: socket.id,
    nickname,
    createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
  };
  io.to(roomCode).emit('receive chat', receiveChat);
};

const disconnect = async (socket: Socket, io: SocketIO.Server) => {
  const roomCode: string = await socketRoomModel.getRoomBySocket(socket.id);

  await roomSocketsInfoModel.removeSocketByRoom(roomCode, socket.id);
  await socketRoomModel.removeSocket(socket.id);

  if (await roomSocketsInfoModel.isRoomEmpty(roomCode)) {
    await roomInfoModel.removeRoom(roomCode);
    return;
  }

  const rawParticipantsData = await roomSocketsInfoModel.getSocketsByRoom(roomCode);
  const participantsList: participantsType[] = Object.entries(rawParticipantsData).map(([key, value]) => {
    const { nickname, language }: { nickname: string; language: string } = JSON.parse(value);
    return { socketId: key, nickname, language };
  });

  const renewedParticipants: participantsListType = {
    participantsList: participantsList,
    type: 'leave',
  };
  io.to(roomCode).emit('receive participants list', renewedParticipants);
};

const socketControllers = {
  enterChatroom,
  sendChat,
  disconnect,
};

export default socketControllers;
