import http from 'http';
import socketIO, { Socket } from 'socket.io';
import { UserDataType, ParticipantsListType, SendChatType, ReceiveChatType } from '../types/socketTypes';
import socketControllers from './socketController';

const socketLoader = (server: http.Server) => {
  const socketServerOption = {
    cors: {
      origin: '*',
    },
  };

  const io = new socketIO.Server(server, socketServerOption);

  io.on('connection', (socket: Socket) => {
    socket.on('enter chatroom', (userData: UserDataType) => {
      socketControllers.enterChatroom(socket, io, userData);
    });

    socket.on('send chat', (sendChat: SendChatType) => {
      socketControllers.sendChat(socket, io, sendChat);
    });

    socket.on('disconnect', () => {
      socketControllers.disconnect(socket, io);
    });

    socket.on('leave chatroom', () => {
      socketControllers.disconnect(socket, io);
    });
  });
};

export default socketLoader;
