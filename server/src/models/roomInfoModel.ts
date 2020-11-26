import client from './redisConnection';
import Database from '../types/databaseNames';

// 방 삭제하기 (key 삭제)
const removeRoom = (roomCode: string) => {
  return new Promise((resolve, reject) => {
    client.select(Database.ROOM_INFO, () => {
      client.del(roomCode, (err, res) => {
        if (err) return reject(err);
        return resolve(res);
      });
    });
  });
};

const roomInfoModel = {
  removeRoom,
};

export default roomInfoModel;
