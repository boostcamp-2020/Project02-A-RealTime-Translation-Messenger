import roomInfoModel from '../models/roomInfoModel';
import roomSocketsInfoModel from '../models/roomSocketsInfoModel';
import socketRoomModel from '../models/socketRoomModel';

const databaseLoader = async () => {
  try {
    await roomInfoModel.flushAll();
    await roomSocketsInfoModel.flushAll();
    await socketRoomModel.flushAll();
  } catch (err) {}
};

export default databaseLoader;
