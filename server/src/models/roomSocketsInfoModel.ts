import client from './redisConnection';
import Database from '../types/databaseNames';

// 소켓 정보 저장 (룸의 소켓 리스트에 소켓 추가) 합격!
const setSocketInfo = (roomCode: string, socketId: string, socketInfo: string) => {
  return new Promise<number>((resolve, reject) => {
    client.select(Database.ROOM_SOCKETS_INFO, () => {
      client.hset([roomCode, socketId, socketInfo], (err, res) => {
        if (err) reject(err);
        return resolve(res);
      });
    });
  });
};

// 룸에 속한 소켓 리스트 뽑아주기 합격!
const getSocketsByRoom = (roomCode: string) => {
  return new Promise<{ [key: string]: string }>((resolve, reject) => {
    client.select(Database.ROOM_SOCKETS_INFO, () => {
      client.hgetall(roomCode, (err, res) => {
        if (err) return reject(err);
        return resolve(res);
      });
    });
  });
};

const removeSocketByRoom = (roomCode: string, socketId: string) => {
  return new Promise<number>((resolve, reject) => {
    client.select(Database.ROOM_SOCKETS_INFO, () => {
      client.hdel(roomCode, socketId, (err, res) => {
        if (err) return reject(err);
        return resolve(res);
      });
    });
  });
};

const isRoomEmpty = (roomCode: string) => {
  return new Promise<boolean>((resolve, reject) => {
    client.select(Database.ROOM_SOCKETS_INFO, () => {
      client.keys('*', (err, res) => {
        if (err) return reject(err);
        if (res.includes(roomCode)) return resolve(false);
        return resolve(true);
      });
    });
  });
};

const getSocketCountByRoom = (roomCode: string) => {
  return new Promise<number>((resolve, reject) => {
    client.select(Database.ROOM_SOCKETS_INFO, () => {
      client.hlen(roomCode, (err, res) => {
        if (err) return reject(err);
        return resolve(res);
      });
    });
  });
};

const roomSocketsInfoModel = {
  setSocketInfo,
  getSocketsByRoom,
  removeSocketByRoom,
  isRoomEmpty,
  getSocketCountByRoom,
};

export default roomSocketsInfoModel;
