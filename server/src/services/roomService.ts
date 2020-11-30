import roomInfoModel from '../models/roomInfoModel';
import roomSocketsInfoModel from '../models/roomSocketsInfoModel';
import { RoomInfoType } from '../@types/dataType';

const getRoomInfoList = async (roomCodeList: string[]) => {
  const roomInfos: RoomInfoType[] = await Promise.all(
    roomCodeList.map(async (roomCode) => await roomInfoModel.getRoomInfo(roomCode)),
  );

  const roomLists = await Promise.all(
    roomInfos.map(async (roomInfo) => {
      const key = roomInfo.roomCode;
      const count = await roomSocketsInfoModel.getSocketCountByRoom(key);
      return { ...roomInfo, participantCount: count };
    }),
  );
  return roomLists;
};

const roomService = {
  getRoomInfoList,
};

export default roomService;
