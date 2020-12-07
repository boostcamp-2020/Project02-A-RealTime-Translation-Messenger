import axios from 'axios';
import { RoomListType } from '../@types/types';

const getRoomList = async () => {
  return axios.get<{ roomList: RoomListType[] }>('http://118.67.134.11:3000/api/room');
};

const api = {
  getRoomList,
};

export default api;
