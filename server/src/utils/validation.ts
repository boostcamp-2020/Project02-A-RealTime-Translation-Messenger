import dotenv from 'dotenv';

import roomGroup from '../models/roomGroup';
import LangCode from '../@types/language';
import { SendChatType } from '../@types/dataType';
import room from '../@types/roomInfo';

dotenv.config();

const isValidRoomCode = (roomCode: string) => {
  if (!/^[A-Z|0-9]{4}$/.test(roomCode)) return false;

  return true;
};

const isValidRoom = async (roomCode: string, isPrivate: string) => {
  if (!isValidRoomCode(roomCode)) return false;

  if (!(await roomGroup.checkExistedCode(roomCode))) return false;

  if (isPrivate === room.PRIVATE) {
    if (!(await roomGroup.isRoomPrivate(roomCode))) return false;
  } else if (await roomGroup.isRoomPrivate(roomCode)) return false;

  return true;
};

const isValidRoomDisclosureStatus = (isPrivate: string) => {
  if (isPrivate !== room.PRIVATE && isPrivate !== room.PUBLIC) return false;

  return true;
};

const isValidTitle = (title: string) => {
  if (title.length >= room.MIN_TITLE_LENGTH && title.length <= room.MAX_TITLE_LENGTH) return true;

  return false;
};

const isValidNickname = (nickname: string) => {
  if (!/^[A-Z|a-z|가-힣]{2,12}$/.test(nickname)) return false;

  return true;
};

const isValidLanguage = (language: string) => {
  if (language === LangCode.KOREAN || language === LangCode.ENGLISH) return true;

  return false;
};

const isValidMessage = (sendChat: SendChatType) => {
  const { origin } = sendChat;
  if (origin !== LangCode.KOREAN && origin !== LangCode.ENGLISH) return false;

  const message = sendChat[origin];
  if (message.trim().length === 0) return false;
  if (message.length < 1 && message.length > 80) return false;

  return true;
};

const isValidImageLink = (imageLink: string) => {
  const { IMAGE_ENDPOINT } = process.env;
  const regex = new RegExp(`^${IMAGE_ENDPOINT!}/pupago/.*\.jpg$`, 'g');
  if (!regex.test(imageLink)) return false;
  return true;
};

const validation = {
  isValidRoomCode,
  isValidRoom,
  isValidRoomDisclosureStatus,
  isValidTitle,
  isValidNickname,
  isValidLanguage,
  isValidMessage,
  isValidImageLink,
};

export default validation;
