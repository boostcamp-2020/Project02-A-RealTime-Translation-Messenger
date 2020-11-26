import client from './redisConnection';
import Database from '../types/databaseNames';

const removeRoom = (roomCode: string) => {
  return new Promise<number>((resolve, reject) => {
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
