import roomGroup from '../models/roomGroup';

const getRoom = async (roomCode: string, isPrivate: string) => {
  const title = await roomGroup.getTitle(roomCode);
  const room = { roomCode, title, isPrivate };

  return room;
};

const joinService = {
  getRoom,
};

export default joinService;
