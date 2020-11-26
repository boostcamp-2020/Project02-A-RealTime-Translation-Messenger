import client from './redisConnection';
import Database from '../types/databaseNames';

// 2번 DB

const setRoomBySocket = (socketId: string, roomCode: string) => {
  return new Promise((resolve, reject) => {
    client.select(Database.SOCKET_ROOM, () => {
      client.set(socketId, roomCode, (err, res) => {
        if (err) return reject(err);
        return resolve(res);
      });
    });
  });
};

const getRoomBySocket = (socketId: string) => {
  return new Promise((resolve, reject) => {
    client.select(Database.SOCKET_ROOM, () => {
      client.get(socketId, (err, res) => {
        if (err) return reject(err);
        return resolve(res);
      });
    });
  });
};

const removeSocket = (socketId: string) => {
  // 나간 소켓의 정보 삭제
};

const socketRoomModel = {
  setRoomBySocket,
  getRoomBySocket,
  removeSocket,
};

export default socketRoomModel;
