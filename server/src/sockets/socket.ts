import https from 'https';
import socketIO, { Socket } from 'socket.io';

import socketController from './socketController';
import { UserType, SendChatType } from '../@types/dataType';

const socketLoader = (server: https.Server) => {
  const io = socketIO(server);

  io.on('connection', (socket: Socket) => {
    socket.on('enter chatroom', (userData: UserType) => {
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
