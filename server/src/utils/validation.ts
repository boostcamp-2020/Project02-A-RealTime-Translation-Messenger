import roomGroup from '../models/roomGroup';
import LangCode from '../@types/language';
import room from '../@types/roomInfo';
import RegExpression from '../@types/regExpression';
import { SendChatType } from '../@types/dataType';

const isValidRoomCode = (roomCode: string) => {
  const regex = new RegExp(RegExpression.ROOM_CODE, RegExpression.RANGE);
  if (!regex.test(roomCode)) return false;

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
  const regex = new RegExp(RegExpression.NICKNAME, RegExpression.RANGE);
  if (!regex.test(nickname)) return false;

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
  const regex = new RegExp(RegExpression.IMAGE_LINK, RegExpression.RANGE);
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
