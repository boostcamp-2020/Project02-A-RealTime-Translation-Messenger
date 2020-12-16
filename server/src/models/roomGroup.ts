import client from './redisConnection';
import Database from '../@types/databaseName';
import dateUtil from '../utils/date';
import RoomInfo from '../@types/roomInfo';
import { RoomType } from '../@types/dataType';

const removeRoom = (roomCode: string) => {
  return new Promise<number>((resolve, reject) => {
    client.select(Database.ROOM_GROUP, () => {
      client.del(roomCode, (err, res) => {
        if (err) return reject(err);
        return resolve(res);
      });
    });
  });
};

const getRoomCodes = () => {
  return new Promise<string[]>((resolve, reject) => {
    client.select(Database.ROOM_GROUP, () => {
      client.keys('*', (err, codes) => {
        if (err) return reject(err);
        return resolve(codes);
      });
    });
  });
};

const getRoom = (roomCode: string) => {
  return new Promise<RoomType>((resolve, reject) => {
    client.hgetall(roomCode, (err, res) => {
      if (err) return reject(err);
      return resolve({ roomCode, ...Object.assign(res) });
    });
  });
};

const checkExistedCode = (roomCode: string) => {
  return new Promise<boolean>((resolve, reject) => {
    client.select(Database.ROOM_GROUP, () => {
      client.exists(roomCode, (err, res) => {
        if (err) return reject(err);
        if (res === 1) return resolve(true);
        return resolve(false);
      });
    });
  });
};

const saveRoom = (roomCode: string, title: string, isPrivate: string) => {
  return new Promise<'OK'>((resolve, reject) => {
    client.select(Database.ROOM_GROUP, () => {
      client.hmset(roomCode, 'title', title, 'createdAt', dateUtil.getNow(), 'isPrivate', isPrivate, (err, res) => {
        if (err) return reject(err);
        return resolve(res);
      });
    });
  });
};

const isRoomPrivate = (roomCode: string) => {
  return new Promise<boolean>((resolve, reject) => {
    client.select(Database.ROOM_GROUP, () => {
      client.hget(roomCode, 'isPrivate', (err, res) => {
        if (err) return reject(err);
        if (res === RoomInfo.PRIVATE) return resolve(true);
        return resolve(false);
      });
    });
  });
};

const getTitle = (roomCode: string) => {
  return new Promise<string>((resolve, reject) => {
    client.select(Database.ROOM_GROUP, () => {
      client.hget(roomCode, 'title', (err, res) => {
        if (err) return reject(err);
        return resolve(res);
      });
    });
  });
};

const flushAll = () => {
  return new Promise<string>((resolve, reject) => {
    client.select(Database.ROOM_GROUP, () => {
      client.flushall((err, res) => {
        if (err) return reject(err);
        return resolve(res);
      });
    });
  });
};

const roomGroup = {
  removeRoom,
  getRoomCodes,
  getRoom,
  checkExistedCode,
  saveRoom,
  isRoomPrivate,
  getTitle,
  flushAll,
};

export default roomGroup;
