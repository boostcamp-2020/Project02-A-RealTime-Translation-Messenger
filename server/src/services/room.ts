import roomGroup from '../models/roomGroup';
import socketsInRoom from '../models/socketsInRoom';

const getRooms = async (roomCodeList: string[]) => {
  const rooms = await Promise.all(roomCodeList.map(async (roomCode) => await roomGroup.getRoom(roomCode)));

  const roomsIncludeCount = await Promise.all(
    rooms.map(async (room) => {
      const key = room.roomCode;
      const count = await socketsInRoom.getSocketCountInRoom(key);
      return { ...room, participantCount: count };
    }),
  );
  return roomsIncludeCount;
};

const roomService = {
  getRooms,
};

export default roomService;
