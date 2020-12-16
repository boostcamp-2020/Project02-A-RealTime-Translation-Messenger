import client from './redisConnection';
import Database from '../@types/databaseName';

const saveRoomCode = (socketId: string, roomCode: string) => {
  return new Promise<'OK'>((resolve, reject) => {
    client.select(Database.ROOM_CODE_ON_SOCKET, () => {
      client.set(socketId, roomCode, (err, res) => {
        if (err) return reject(err);
        return resolve(res);
      });
    });
  });
};

const getRoomCode = (socketId: string) => {
  return new Promise<string>((resolve, reject) => {
    client.select(Database.ROOM_CODE_ON_SOCKET, () => {
      client.get(socketId, (err, res) => {
        if (err || res === null) return reject(err);
        return resolve(res);
      });
    });
  });
};

const removeSocket = (socketId: string) => {
  return new Promise<number>((resolve, reject) => {
    client.select(Database.ROOM_CODE_ON_SOCKET, () => {
      client.del(socketId, (err, res) => {
        if (err) return reject(err);
        return resolve(res);
      });
    });
  });
};

const flushAll = () => {
  return new Promise<string>((resolve, reject) => {
    client.select(Database.ROOM_CODE_ON_SOCKET, () => {
      client.flushall((err, res) => {
        if (err) return reject(err);
        return resolve(res);
      });
    });
  });
};

const roomCodeOnSocket = {
  saveRoomCode,
  getRoomCode,
  removeSocket,
  flushAll,
};

export default roomCodeOnSocket;
