import { userDataType, participantsListType, sendChatType, receiveChatType } from '../types/socketTypes';
import SocketIO, { Socket } from 'socket.io';

const enterChatroom = (socket: Socket, io: SocketIO.Server, userData: userDataType) => {
  const { roomCode, nickname, language } = userData;
  socket.join(roomCode);
  // TODO: db1, 2 소켓 정보 저장
  const participantsList: participantsListType = {
    // TODO: 참가자 리스트 가져와서 넣어주기
    participantsList: [],
    type: 'enter',
  };
  io.to(roomCode).emit('receive participants list', participantsList);
};

const sendChat = (socket: Socket, io: SocketIO.Server, sendChat: sendChatType) => {
  const { Korean, English } = sendChat;
  const receiveChat: receiveChatType = {
    Korean,
    English,
    senderId: socket.id,
  };
  // TODO: 현재 소켓이 속해있는 방 id 받아오기
  const roomCode = '1'; // db를 통해 받아오기
  io.to(roomCode).emit('receive chat', receiveChat);
};

const disconnect = (socket: Socket, io: SocketIO.Server) => {
  // TODO: 현재 소켓이 속해있는 방 id 받아오기
  const roomCode = '1'; // db를 통해 받아오기
  const participantsList: participantsListType = {
    // TODO: 참가자 리스트 가져와서 넣어주기
    participantsList: [],
    type: 'leave',
  };
  io.to(roomCode).emit('receive participants list', participantsList);
  // TODO: 소켓을 DB 1, 2번에서 제거
  // TODO: 방이 비었는지 확인하고 비었으면 0번에서 해당 방 제거
};

const socketControllers = {
  enterChatroom,
  sendChat,
  disconnect,
};

export default socketControllers;
