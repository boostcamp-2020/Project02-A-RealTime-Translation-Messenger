import SocketIO, { Socket } from 'socket.io';

import socketService from './socketService';
import socketRoomModel from '../models/socketRoomModel';
import roomSocketsInfoModel from '../models/roomSocketsInfoModel';
import roomInfoModel from '../models/roomInfoModel';
import validationUtil from '../utils/validation';
import SocketErrorMessage from '../@types/socketErrorMessage';
import { UserDataType, SendChatType } from '../@types/dataType';

const enterChatroom = async (socket: Socket, io: SocketIO.Server, userData: UserDataType) => {
  const { roomCode, nickname, language } = userData;

  if (!validationUtil.isRoomCodeValid(roomCode))
    return socketService.emitSocketError(socket, SocketErrorMessage.ROOM_CODE);
  if (!validationUtil.isNicknameValid(nickname))
    return socketService.emitSocketError(socket, SocketErrorMessage.NICKNAME);
  if (!validationUtil.isLanguageValid(language))
    return socketService.emitSocketError(socket, SocketErrorMessage.LANGUAGE);

  socket.join(roomCode);

  try {
    await socketService.insertSocketInfoIntoDB(socket.id, roomCode, nickname, language);
    const participantsList = await socketService.getParticipantsListFromRoomCode(roomCode, 'enter');
    io.to(roomCode).emit('receive participants list', JSON.stringify(participantsList));
  } catch (err) {
    return socketService.emitSocketError(socket, SocketErrorMessage.SERVER);
  }
};

const sendChat = async (socket: Socket, io: SocketIO.Server, sendChat: SendChatType) => {
  const { Korean, English } = sendChat;

  if (!validationUtil.isMessageValid(sendChat)) return socketService.emitSocketError(socket, SocketErrorMessage.CHAT);

  try {
    const { roomCode, receiveChat } = await socketService.createReceiveChatType(socket.id, Korean, English);
    io.to(roomCode).emit('receive chat', JSON.stringify(receiveChat));
  } catch (err) {
    return socketService.emitSocketError(socket, SocketErrorMessage.SERVER);
  }
};

const disconnect = async (socket: Socket, io: SocketIO.Server) => {
  try {
    const roomCode: string = await socketRoomModel.getRoomBySocket(socket.id);
    if (roomCode !== null) {
      await socketService.removeSocketInfoFromDB(socket.id, roomCode);

      if (await roomSocketsInfoModel.isRoomEmpty(roomCode)) {
        await roomInfoModel.removeRoom(roomCode);
        return;
      }

      const participantsList = await socketService.getParticipantsListFromRoomCode(roomCode, 'leave');
      io.to(roomCode).emit('receive participants list', JSON.stringify(participantsList));
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
