import { SendChatType } from '../@types/dataType';
import roomInfoModel from '../models/roomInfoModel';

const isRoomCodeValid = (roomCode: string) => {
  if (!/^[A-Z|0-9]{4}$/.test(roomCode)) return false;

  return true;
};

const isRoomValid = async (roomCode: string, isPrivate: string) => {
  if (!isRoomCodeValid(roomCode)) return false;

  if (!(await roomInfoModel.isRoomCodeExisting(roomCode))) return false;

  if (isPrivate === 'true') {
    if (!(await roomInfoModel.isRoomPrivate(roomCode))) return false;
  } else if (await roomInfoModel.isRoomPrivate(roomCode)) return false;

  return true;
};

const isIsPrivateValid = (isPrivate: string) => {
  if (isPrivate !== 'true' && isPrivate !== 'false') return false;

  return true;
};

const isTitleValid = (title: string) => {
  if (title.length >= 2 && title.length <= 30) return true;

  return false;
};

const isNicknameValid = (nickname: string) => {
  if (!/^[A-Z|a-z|가-힣]{2,12}$/.test(nickname)) return false;

  return true;
};

const isLanguageValid = (language: string) => {
  if (language === 'Korean' || language === 'English') return true;

  return false;
};

const isMessageValid = (sendChat: SendChatType) => {
  const { origin } = sendChat;
  if (origin !== 'Korean' && origin !== 'English') return false;

  const message = sendChat[origin];
  if (message.trim().length === 0) return false;
  if (message.length < 1 && message.length > 80) return false;

  return true;
};

const validationUtil = {
  isRoomCodeValid,
  isRoomValid,
  isIsPrivateValid,
  isTitleValid,
  isNicknameValid,
  isLanguageValid,
  isMessageValid,
};

export default validationUtil;
