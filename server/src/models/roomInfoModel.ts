import client from './redisConnection';
import Database from '../types/databaseNames';
import { roomInfoType } from '../types/socketTypes';
import moment from 'moment';

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
  return new Promise<roomInfoType>((resolve, reject) => {
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
  return new Promise<number>((resolve, reject) => {
    client.select(Database.ROOM_INFO, () => {
      const date = moment().format('YYYY-MM-DD HH:mm:ss');
      client.hset(roomCode, 'title', title, 'createdAt', date, 'isPrivate', isPrivate, (err, res) => {
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

const roomInfoModel = {
  removeRoom,
  getRoomCodeList,
  getRoomInfo,
  isRoomCodeExisting,
  setRoom,
  isRoomPrivate,
  getTitle,
};

export default roomInfoModel;
