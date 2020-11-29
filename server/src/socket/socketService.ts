import roomInfoModel from '../models/roomInfoModel';
import roomSocketsInfoModel from '../models/roomSocketsInfoModel';
import socketRoomModel from '../models/socketRoomModel';
import { getNow } from '../utils/date';
import { getParticipantsListFromRoomCode } from '../utils/room';

import { ParticipantsType, ParticipantsListType, ReceiveChatType } from '../types/socketTypes';

const enterChatRoom = async (socketId: string, roomCode: string, nickname: string, language: string) => {
  await roomSocketsInfoModel.setSocketInfo(roomCode, socketId, JSON.stringify({ nickname, language }));
  await socketRoomModel.setRoomBySocket(socketId, roomCode);

  const renewedParticipants: ParticipantsListType = {
    participantsList: await getParticipantsListFromRoomCode(roomCode),
    type: 'enter',
  };

  return renewedParticipants;
};

const sendChat = async (socketId: string, Korean: string, English: string) => {
  const roomCode = await socketRoomModel.getRoomBySocket(socketId);

  const socketInfo = await roomSocketsInfoModel.getSocketInfo(roomCode, socketId);
  const { nickname }: { nickname: string } = JSON.parse(socketInfo);

  const receiveChat: ReceiveChatType = {
    Korean,
    English,
    senderId: socketId,
    nickname,
    createdAt: getNow(),
  };

  return { roomCode, receiveChat };
};

const disconnect = async (socketId: string) => {
  const roomCode: string = await socketRoomModel.getRoomBySocket(socketId);

  await roomSocketsInfoModel.removeSocketByRoom(roomCode, socketId);
  await socketRoomModel.removeSocket(socketId);

  if (await roomSocketsInfoModel.isRoomEmpty(roomCode)) {
    await roomInfoModel.removeRoom(roomCode);
    return { roomCode, renewedParticipants: null };
  }

  const renewedParticipants: ParticipantsListType = {
    participantsList: await getParticipantsListFromRoomCode(roomCode),
    type: 'leave',
  };

  return { roomCode, renewedParticipants };
};

const socketService = {
  enterChatRoom,
  sendChat,
  disconnect,
};

export default socketService;
