import roomGroup from '../models/roomGroup';
import socketsInRoom from '../models/socketsInRoom';
import roomCodeOnSocket from '../models/roomCodeOnSocket';

const redisLoader = async () => {
  try {
    await roomGroup.flushAll();
    await socketsInRoom.flushAll();
    await roomCodeOnSocket.flushAll();
  } catch (err) {}
};

export default redisLoader;
