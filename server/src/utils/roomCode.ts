import roomGroup from '../models/roomGroup';

const getRandomCode = async () => {
  let roomCode: string;

  while (true) {
    roomCode = Math.random().toString(36).substr(2, 4).toUpperCase();

    if (!(await roomGroup.checkExistedCode(roomCode))) break;
  }

  return roomCode;
};

const roomCodeUtil = {
  getRandomCode,
};

export default roomCodeUtil;
