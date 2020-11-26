import client from './redisConnection';
import Database from '../types/databaseNames';

const setRoomBySocket = (socketId: string, roomCode: string) => {
  return new Promise<'OK'>((resolve, reject) => {
    client.select(Database.SOCKET_ROOM, () => {
      client.set(socketId, roomCode, (err, res) => {
        if (err) return reject(err);
        return resolve(res);
      });
    });
  });
};

const getRoomBySocket = (socketId: string) => {
  return new Promise<string | null>((resolve, reject) => {
    client.select(Database.SOCKET_ROOM, () => {
      client.get(socketId, (err, res) => {
        if (err) return reject(err);
        return resolve(res);
      });
    });
  });
};

const removeSocket = (socketId: string) => {
  return new Promise<number>((resolve, reject) => {
    client.select(Database.SOCKET_ROOM, () => {
      client.del(socketId, (err, res) => {
        if (err) return reject(err);
        return resolve(res);
      });
    });
  });
};

const socketRoomModel = {
  setRoomBySocket,
  getRoomBySocket,
  removeSocket,
};

export default socketRoomModel;
