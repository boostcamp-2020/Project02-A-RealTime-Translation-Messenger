import SocketIO, { Socket } from 'socket.io';

import socketService from './socketService';
import roomCodeOnSocket from '../models/roomCodeOnSocket';
import socketsInRoom from '../models/socketsInRoom';
import roomGroup from '../models/roomGroup';
import validationUtil from '../utils/validation';
import SocketErrorMessage from '../@types/socketErrorMessage';
import { UserType, SendChatType } from '../@types/dataType';

const enterChatroom = async (socket: Socket, io: SocketIO.Server, userData: UserType) => {
  const { roomCode, nickname, language, imageLink } = userData;

  if (!validationUtil.isValidRoomCode(roomCode))
    return socketService.emitSocketError(socket, SocketErrorMessage.ROOM_CODE);
  if (!validationUtil.isValidNickname(nickname))
    return socketService.emitSocketError(socket, SocketErrorMessage.NICKNAME);
  if (!validationUtil.isValidLanguage(language))
    return socketService.emitSocketError(socket, SocketErrorMessage.LANGUAGE);
  if (!validationUtil.isValidImageLink(imageLink))
    return socketService.emitSocketError(socket, SocketErrorMessage.IMAGELINK);

  socket.join(roomCode);

  try {
    await socketService.insertSocketInfoIntoDB(socket.id, roomCode, nickname, language, imageLink);
    const participants = await socketService.getParticipants(roomCode);
    const participantsIncludeNickname = { participantsList: participants, type: 'enter', diffNickname: nickname };
    io.to(roomCode).emit('receive participants list', JSON.stringify(participantsIncludeNickname));
  } catch (err) {
    return socketService.emitSocketError(socket, SocketErrorMessage.SERVER);
  }
};

const sendChat = async (socket: Socket, io: SocketIO.Server, sendChat: SendChatType) => {
  const { Korean, English } = sendChat;

  if (!validationUtil.isValidMessage(sendChat)) return socketService.emitSocketError(socket, SocketErrorMessage.CHAT);

  try {
    const { roomCode, receiveChat } = await socketService.createReceiveChat(socket.id, Korean, English);
    io.to(roomCode).emit('receive chat', JSON.stringify(receiveChat));
  } catch (err) {
    return socketService.emitSocketError(socket, SocketErrorMessage.SERVER);
  }
};

const disconnect = async (socket: Socket, io: SocketIO.Server) => {
  try {
    const roomCode: string = await roomCodeOnSocket.getRoomCode(socket.id);
    const socketInfo = await socketsInRoom.getSocket(roomCode, socket.id);
    const { nickname }: { nickname: string } = JSON.parse(socketInfo);

    if (roomCode !== null) {
      await socketService.removeSocket(socket.id, roomCode);

      if (await socketsInRoom.isRoomEmpty(roomCode)) {
        await roomGroup.removeRoom(roomCode);
        return;
      }

      const participants = await socketService.getParticipants(roomCode);
      const participantsIncludeNickname = { participantsList: participants, type: 'leave', diffNickname: nickname };
      io.to(roomCode).emit('receive participants list', JSON.stringify(participantsIncludeNickname));
    }
  } catch (err) {
    throw new Error(err);
  }
};

const socketError = async (socket: Socket, io: SocketIO.Server) => {
  await disconnect(socket, io);
};

const socketController = {
  enterChatroom,
  sendChat,
  disconnect,
  socketError,
};

export default socketController;
