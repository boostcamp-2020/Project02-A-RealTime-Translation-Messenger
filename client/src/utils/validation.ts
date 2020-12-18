import CharacterLimit from '../@types/characterLimit';

const isValidRoomCode = (roomCode: string) => {
  if (roomCode.length === 0) return true;
  return /^[A-Za-z0-9]*$/.test(roomCode);
};

const isValidRoomTitle = (title: string) => {
  if (title.length < CharacterLimit.ROOM_NAME_MIN || title.length > CharacterLimit.ROOM_NAME_MAX) return false;
  if (title.trim().length === 0) return false;
  return true;
};

const isValidUserInfo = (nickname: string, imageLink: string | null) => {
  if (!/^[A-Z|a-z|가-힣]{2,12}$/.test(nickname)) return false;
  if (!imageLink) return false;
  return true;
};

const validation = {
  isValidRoomCode,
  isValidRoomTitle,
  isValidUserInfo,
};

export default validation;
