import axios from 'axios';

import { RoomListType, CreatedRoomType } from '../@types/types';

const getRoomList = async () => {
  return axios.get<{ roomList: RoomListType[] }>(`${process.env.BASE_URL}/api/room`);
};

const createRoom = async (title: string, isPrivate: 'true' | 'false') => {
  return axios.post<CreatedRoomType>(`${process.env.BASE_URL}/api/room`, { title, isPrivate });
};

const joinRoom = async (roomCode: string, isPrivate: 'true' | 'false') => {
  return axios.post<CreatedRoomType>(`${process.env.BASE_URL}/api/room`, { roomCode, isPrivate });
};

const api = {
  getRoomList,
  createRoom,
  joinRoom,
};

export default api;
