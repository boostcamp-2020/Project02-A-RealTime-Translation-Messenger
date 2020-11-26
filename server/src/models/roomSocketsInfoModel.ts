import client from './redisConnection';
import Database from '../types/databaseNames';

// 소켓 정보 저장 (룸의 소켓 리스트에 소켓 추가)
const setSocketInfo = (socketId: string, socketInfo: string) => {};

// 룸에 속한 소켓 리스트 뽑아주기
const getSocketsByRoom = (roomCode: string) => {
  return new Promise((resolve, reject) => {
    client.select(Database.ROOM_SOCKETS_INFO, () => {
      client.hgetall(roomCode, (err, res) => {
        if (err) return reject(err);
        return resolve(res);
      });
    });
  });
};

// 룸에 나간 소켓 삭제하기
const removeSocketByRoom = (roomCode: string, socketId: string) => {
  return new Promise((resolve, reject) => {
    client.select(Database.ROOM_SOCKETS_INFO, () => {
      client.hdel(roomCode, socketId, (err, res) => {
        if (err) return reject(err);
        return resolve(res);
      });
    });
  });
};

// 룸이 비어있는지 체크
const isRoomEmpty = (roomCode: string) => {};

const roomSocketsInfoModel = {
  setSocketInfo,
  getSocketsByRoom,
  removeSocketByRoom,
  isRoomEmpty,
};

export default roomSocketsInfoModel;
