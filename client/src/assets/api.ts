import axios from 'axios';

import {
  RoomListType,
  TranslateTextPropsType,
  TranslateTextReturnType,
  CreatedRoomResponseType,
} from '../@types/types';

const backend = axios.create({
  baseURL: process.env.BASE_URL,
});

const createRoom = async (title: string, isPrivate: 'true' | 'false') => {
  return backend.post<CreatedRoomResponseType>('/api/room', { title, isPrivate });
};

const joinRoom = async (roomCode: string, isPrivate: 'true' | 'false') => {
  return backend.post<CreatedRoomResponseType>('/api/join', { roomCode, isPrivate });
};

const getRoomList = async () => {
  return backend.get<{ roomList: RoomListType[] }>('/api/room');
};

const detectLanguage = async ({ query }: { query: string }) => {
  return backend.post<{ langCode: string }>('/api/papago/detection', {
    query,
  });
};

const translateText = async ({ source, target, text }: TranslateTextPropsType) => {
  return backend.post<TranslateTextReturnType>(`/api/papago/translation`, {
    source,
    target,
    text,
  });
};

const getRandomProfileImage = async () => backend.get<{ imageLink: string }>('/api/profileImage');

const api = {
  getRoomList,
  createRoom,
  joinRoom,
  detectLanguage,
  translateText,
  getRandomProfileImage,
};

export default api;
