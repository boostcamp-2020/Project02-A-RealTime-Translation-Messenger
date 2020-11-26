import {
  userDataType,
  participantsType,
  participantsListType,
  sendChatType,
  receiveChatType,
} from '../types/socketTypes';
import SocketIO, { Socket } from 'socket.io';
import roomInfoModel from '../models/roomInfoModel';
import roomSocketsInfoModel from '../models/roomSocketsInfoModel';
import socketRoomModel from '../models/socketRoomModel';

const enterChatroom = async (socket: Socket, io: SocketIO.Server, userData: userDataType) => {
  const { roomCode, nickname, language } = userData;
  socket.join(roomCode);
  // TODO: db1, 2 소켓 정보 저장
  await roomSocketsInfoModel.setSocketInfo(roomCode, socket.id, JSON.stringify({ nickname, language }));
  await socketRoomModel.setRoomBySocket(socket.id, roomCode);

  const rawParticipantsData = await roomSocketsInfoModel.getSocketsByRoom(roomCode);
  const participantsList: participantsType[] = Object.entries(rawParticipantsData).map(([key, value]) => {
    const { nickname, language }: { nickname: string; language: string } = JSON.parse(value);
    return { socketId: key, nickname, language };
  });

  const renewedParticipants: participantsListType = {
    // TODO: 참가자 리스트 가져와서 넣어주기
    participantsList: participantsList,
    type: 'enter',
  };
  io.to(roomCode).emit('receive participants list', renewedParticipants);
};

const sendChat = async (socket: Socket, io: SocketIO.Server, sendChat: sendChatType) => {
  const { Korean, English } = sendChat;
  const receiveChat: receiveChatType = {
    Korean,
    English,
    senderId: socket.id,
  };
  // TODO: 현재 소켓이 속해있는 방 id 받아오기
  const roomCode: string = await socketRoomModel.getRoomBySocket(socket.id); // db를 통해 받아오기
  io.to(roomCode).emit('receive chat', receiveChat);
};

const disconnect = async (socket: Socket, io: SocketIO.Server) => {
  // TODO: 현재 소켓이 속해있는 방 id 받아오기
  const roomCode: string = await socketRoomModel.getRoomBySocket(socket.id); // db를 통해 받아오기

  const rawParticipantsData = await roomSocketsInfoModel.getSocketsByRoom(roomCode);
  const participantsList: participantsType[] = Object.entries(rawParticipantsData).map(([key, value]) => {
    const { nickname, language }: { nickname: string; language: string } = JSON.parse(value);
    return { socketId: key, nickname, language };
  });

  const renewedParticipants: participantsListType = {
    // TODO: 참가자 리스트 가져와서 넣어주기
    participantsList: participantsList,
    type: 'leave',
  };
  io.to(roomCode).emit('receive participants list', renewedParticipants);
  // TODO: 소켓을 DB 1, 2번에서 제거
  await roomSocketsInfoModel.removeSocketByRoom(roomCode, socket.id);
  await socketRoomModel.removeSocket(socket.id);
  // TODO: 방이 비었는지 확인하고 비었으면 0번에서 해당 방 제거
  if (await roomSocketsInfoModel.isRoomEmpty(roomCode)) {
    await roomInfoModel.removeRoom(roomCode);
  }
};

const socketControllers = {
  enterChatroom,
  sendChat,
  disconnect,
};

export default socketControllers;
