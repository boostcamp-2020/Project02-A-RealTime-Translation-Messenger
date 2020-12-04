import http from 'http';
import socketIO, { Socket } from 'socket.io';

import socketController from './socketController';
import { UserDataType, SendChatType } from '../@types/dataType';

const socketLoader = (server: http.Server) => {
  const io = socketIO(server);

  io.on('connection', (socket: Socket) => {
    console.log(socket.id);

    socket.on('enter chatroom', (userData: UserDataType) => {
      socketController.enterChatroom(socket, io, userData);
    });

    socket.on('send chat', (sendChat: SendChatType) => {
      socketController.sendChat(socket, io, sendChat);
    });

    socket.on('disconnect', () => {
      socketController.disconnect(socket, io);
    });

    socket.on('leave chatroom', () => {
      socketController.disconnect(socket, io);
    });

    socket.on('error', () => {
      socketController.socketError(socket, io);
    });
  });
};

export default socketLoader;
