import client from './redisConnection';
import Database from '../@types/databaseName';

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

const getSocketInfo = (roomCode: string, socketId: string) => {
  return new Promise<string>((resolve, reject) => {
    client.select(Database.ROOM_SOCKETS_INFO, () => {
      client.hget(roomCode, socketId, (err, res) => {
        if (err) return reject(err);
        return resolve(res);
      });
    });
  });
};

const flushAll = () => {
  return new Promise<string>((resolve, reject) => {
    client.select(Database.ROOM_SOCKETS_INFO, () => {
      client.flushall((err, res) => {
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
  getSocketInfo,
  flushAll,
};

export default roomSocketsInfoModel;
