import roomInfoModel from '../models/roomInfoModel';

const isRoomCodeValid = async (roomCode: string, isPrivate: string) => {
  if (!/[A-Z0-9]{4}/.test(roomCode)) return false;
  if (!(await roomInfoModel.isRoomCodeExisting(roomCode))) return false;

  if (isPrivate === 'private') {
    if (!(await roomInfoModel.isRoomPrivate(roomCode))) {
      return false;
    }
    return true;
  }

  if (await roomInfoModel.isRoomPrivate(roomCode)) {
    return false;
  }
  return true;
};

const validationUtil = {
  isRoomCodeValid,
};

export default validationUtil;
