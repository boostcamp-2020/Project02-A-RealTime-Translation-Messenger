import http from 'http';
import socketIO, { Socket } from 'socket.io';
import { userDataType, participantsListType, sendChatType, receiveChatType } from '../types/socketTypes';
import socketControllers from './socketController';

const socketLoader = (server: http.Server) => {
  const io = new socketIO.Server(server, {
    cors: {
      origin: '*',
    },
  });

  io.on('connection', (socket: Socket) => {
    socket.on('enter chatroom', (userData: userDataType) => {
      socketControllers.enterChatroom(socket, io, userData);
    });

    socket.on('send chat', (sendChat: sendChatType) => {
      socketControllers.sendChat(socket, io, sendChat);
    });

    // disconnect 와 leave chatroom은 동일한 내용을 가지고 있어야 함
    socket.on('disconnect', () => {
      socketControllers.disconnect(socket, io);
    });

    // socket.on('leave chatroom')
  });
};

export default socketLoader;
