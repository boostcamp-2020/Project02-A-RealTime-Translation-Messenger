import roomInfoModel from '../models/roomInfoModel';
import { CreatedRoomType } from '../@types/dataType';

const getRoomInfo = async (roomCode: string, isPrivate: string) => {
  const title = await roomInfoModel.getTitle(roomCode);
  const createdRoom: CreatedRoomType = { roomCode, title, isPrivate };

  return createdRoom;
};

const joinService = {
  getRoomInfo,
};

export default joinService;
