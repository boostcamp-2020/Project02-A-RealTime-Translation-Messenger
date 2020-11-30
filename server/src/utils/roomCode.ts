import roomInfoModel from '../models/roomInfoModel';

const getRandomCode = async () => {
  let roomCode: string;

  while (true) {
    roomCode = Math.random().toString(36).substr(2, 4).toUpperCase();
    // 36 = 36진수 난수 생성, 이게 소수인데, 0.을 제거하는게 2, 이후의 4자리 의미
    if (!(await roomInfoModel.isRoomCodeExisting(roomCode))) break;
  }

  return roomCode;
};

const roomCodeUtil = {
  getRandomCode,
};

export default roomCodeUtil;
