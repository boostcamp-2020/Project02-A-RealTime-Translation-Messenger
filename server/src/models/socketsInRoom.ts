import client from './redisConnection';
import Database from '../@types/databaseName';

const setSocket = (roomCode: string, socketId: string, socketInfo: string) => {
  return new Promise<number>((resolve, reject) => {
    client.select(Database.SOCKETS_IN_ROOM, () => {
      client.hset([roomCode, socketId, socketInfo], (err, res) => {
        if (err) reject(err);
        return resolve(res);
      });
    });
  });
};

const getSockets = (roomCode: string) => {
  return new Promise<{ [key: string]: string }>((resolve, reject) => {
    client.select(Database.SOCKETS_IN_ROOM, () => {
      client.hgetall(roomCode, (err, res) => {
        if (err) return reject(err);
        return resolve(res);
      });
    });
  });
};

const removeSocket = (roomCode: string, socketId: string) => {
  return new Promise<number>((resolve, reject) => {
    client.select(Database.SOCKETS_IN_ROOM, () => {
      client.hdel(roomCode, socketId, (err, res) => {
        if (err) return reject(err);
        return resolve(res);
      });
    });
  });
};

const isRoomEmpty = (roomCode: string) => {
  return new Promise<boolean>((resolve, reject) => {
    client.select(Database.SOCKETS_IN_ROOM, () => {
      client.keys('*', (err, res) => {
        if (err) return reject(err);
        if (res.includes(roomCode)) return resolve(false);
        return resolve(true);
      });
    });
  });
};

const getSocketCountInRoom = (roomCode: string) => {
  return new Promise<number>((resolve, reject) => {
    client.select(Database.SOCKETS_IN_ROOM, () => {
      client.hlen(roomCode, (err, res) => {
        if (err) return reject(err);
        return resolve(res);
      });
    });
  });
};

const getSocket = (roomCode: string, socketId: string) => {
  return new Promise<string>((resolve, reject) => {
    client.select(Database.SOCKETS_IN_ROOM, () => {
      client.hget(roomCode, socketId, (err, res) => {
        if (err) return reject(err);
        return resolve(res);
      });
    });
  });
};

const flushAll = () => {
  return new Promise<string>((resolve, reject) => {
    client.select(Database.SOCKETS_IN_ROOM, () => {
      client.flushall((err, res) => {
        if (err) return reject(err);
        return resolve(res);
      });
    });
  });
};

const socketsInRoom = {
  setSocket,
  getSockets,
  removeSocket,
  isRoomEmpty,
  getSocketCountInRoom,
  getSocket,
  flushAll,
};

export default socketsInRoom;
