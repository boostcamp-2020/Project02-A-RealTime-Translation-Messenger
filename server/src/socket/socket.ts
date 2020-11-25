import express from 'express';
import * as http from 'http';
import socketIO from 'socket.io';
import { userDataType, participantsListType, sendChatType, receiveChatType } from '../types/socketTypes';
import socketControllers from './socketController';

const socketLoader = (app: express.Application) => {
  const server = http.createServer(app);
  const io = new socketIO.Server(server);

  io.on('connection', (socket) => {
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

export default expressLoader;
