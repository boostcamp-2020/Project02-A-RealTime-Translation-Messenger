import client from './redisConnection';
import Database from '../types/databaseNames';

// 방 삭제하기 (key 삭제)
const removeRoom = (roomCode: string) => {};

const roomInfoModel = {
  removeRoom,
};

export default roomInfoModel;
