import client from './redisConnection';
import Database from '../@types/databaseName';
import dateUtil from '../utils/date';
import { RoomInfoType } from '../@types/dataType';

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

const getRoomCodeList = () => {
  return new Promise<string[]>((resolve, reject) => {
    client.select(Database.ROOM_INFO, () => {
      client.keys('*', (err, codes) => {
        if (err) return reject(err);
        return resolve(codes);
      });
    });
  });
};

const getRoomInfo = (roomCode: string) => {
  return new Promise<RoomInfoType>((resolve, reject) => {
    client.hgetall(roomCode, (err, res) => {
      if (err) return reject(err);
      return resolve({ roomCode, ...Object.assign(res) });
    });
  });
};

const isRoomCodeExisting = (roomCode: string) => {
  return new Promise<boolean>((resolve, reject) => {
    client.select(Database.ROOM_INFO, () => {
      client.exists(roomCode, (err, res) => {
        if (err) return reject(err);
        if (res === 1) return resolve(true);
        return resolve(false);
      });
    });
  });
};

const setRoom = (roomCode: string, title: string, isPrivate: string) => {
  return new Promise<'OK'>((resolve, reject) => {
    client.select(Database.ROOM_INFO, () => {
      client.hmset(roomCode, 'title', title, 'createdAt', dateUtil.getNow(), 'isPrivate', isPrivate, (err, res) => {
        if (err) return reject(err);
        return resolve(res);
      });
    });
  });
};

const isRoomPrivate = (roomCode: string) => {
  return new Promise<boolean>((resolve, reject) => {
    client.select(Database.ROOM_INFO, () => {
      client.hget(roomCode, 'isPrivate', (err, res) => {
        if (err) return reject(err);
        if (res === 'true') return resolve(true);
        return resolve(false);
      });
    });
  });
};

const getTitle = (roomCode: string) => {
  return new Promise<string>((resolve, reject) => {
    client.select(Database.ROOM_INFO, () => {
      client.hget(roomCode, 'title', (err, res) => {
        if (err) return reject(err);
        return resolve(res);
      });
    });
  });
};

const flushAll = () => {
  return new Promise<string>((resolve, reject) => {
    client.select(Database.ROOM_INFO, () => {
      client.flushall((err, res) => {
        if (err) return reject(err);
        return resolve(res);
      });
    });
  });
};

const roomInfoModel = {
  removeRoom,
  getRoomCodeList,
  getRoomInfo,
  isRoomCodeExisting,
  setRoom,
  isRoomPrivate,
  getTitle,
  flushAll,
};

export default roomInfoModel;
