import client from './redisConnection';

// 2번 DB

const setRoomBySocket = (socketId: string, roomId: string) => {
  return new Promise((resolve, reject) => {
    client.select(2, () => {
      client.set(socketId, roomId, (err, res) => {
        if (err) return reject(err);
        return resolve(res);
      });
    });
  });
};

const getRoomBySocket = (socketId: string) => {
  return new Promise((resolve, reject) => {
    client.select(2, () => {
      client.get(socketId, (err, res) => {
        if (err) return reject(err);
        return resolve(res);
      });
    });
  });
};

export default { setRoomBySocket, getRoomBySocket };
