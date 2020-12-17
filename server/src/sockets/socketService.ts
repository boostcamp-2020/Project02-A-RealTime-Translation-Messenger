import socketsInRoom from '../models/socketsInRoom';
import roomCodeOnSocket from '../models/roomCodeOnSocket';
import dateUtil from '../utils/date';
import { ReceiveChatType, ParticipantType } from '../@types/dataType';
import { Socket } from 'socket.io';

const getParticipants = async (roomCode: string) => {
  const participantsInDB = await socketsInRoom.getSockets(roomCode);
  const participants: ParticipantType[] = Object.entries(participantsInDB).map(([key, value]) => {
    const { nickname, language, imageLink }: { nickname: string; language: string; imageLink: string } = JSON.parse(
      value,
    );
    return { socketId: key, nickname, language, imageLink };
  });

  return participants;
};

const insertSocketInfoIntoDB = async (
  socketId: string,
  roomCode: string,
  nickname: string,
  language: string,
  imageLink: string,
) => {
  await socketsInRoom.setSocket(roomCode, socketId, JSON.stringify({ nickname, language, imageLink }));
  await roomCodeOnSocket.saveRoomCode(socketId, roomCode);
  return true;
};

const createReceiveChat = async (socketId: string, Korean: string, English: string) => {
  const roomCode = await roomCodeOnSocket.getRoomCode(socketId);

  const socket = await socketsInRoom.getSocket(roomCode, socketId);
  const { nickname, imageLink }: { nickname: string; imageLink: string } = JSON.parse(socket);

  const receiveChat: ReceiveChatType = {
    Korean,
    English,
    senderId: socketId,
    nickname,
    imageLink,
    createdAt: dateUtil.getNow(),
  };

  return { roomCode, receiveChat };
};

const removeSocket = async (socketId: string, roomCode: string) => {
  await socketsInRoom.removeSocket(roomCode, socketId);
  await roomCodeOnSocket.removeSocket(socketId);
  return true;
};

const emitSocketError = (socket: Socket, errorMessage: string) => {
  socket.emit('socket error', JSON.stringify({ errorMessage }));
};

const socketService = {
  getParticipants,
  insertSocketInfoIntoDB,
  createReceiveChat,
  removeSocket,
  emitSocketError,
};

export default socketService;
