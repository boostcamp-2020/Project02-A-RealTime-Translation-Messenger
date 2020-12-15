import LangCode from './langCode';

type RoomListType = {
  roomCode: string;
  title: string;
  createdAt: string;
  participantCount: number;
  isPrivate: 'true' | 'false';
};

type ParticipantsType = {
  socketId: string;
  nickname: string;
  language: string;
  imageLink: string;
};

type ParticipantsListType = {
  participantsList: ParticipantsType[];
  type: 'enter' | 'leave';
  diffNickname: string;
};

type ReceiveChatType = {
  Korean: string;
  English: string;
  senderId: string;
  nickname: string;
  imageLink: string;
  createdAt: string;
};

type CreatedRoomType = {
  roomCode: string;
  title: string;
  isPrivate: 'true' | 'false';
};

type ChatLogsType = {
  Korean: string;
  English: string;
  senderId: string;
  nickname: string;
  imageLink: string;
  createdAt: string;
};

type ParticipantsUpdateType = {
  type: 'enter' | 'leave';
  diffNickname: string;
};

type TranslateTextPropsType = {
  source: LangCode;
  target: LangCode;
  text: string;
};

type TranslateTextReturnType = {
  srcLangType: string;
  tarLangType: string;
  translatedText: string;
};

type JoiningRoomType = {
  roomCode: string;
  isPrivate: 'true' | 'false';
};

type CreatingRoomType = {
  title: string;
  isPrivate: 'true' | 'false';
};

enum SideBarStatus {
  PARTICIPANTS,
  CHAT_ROOMS,
}

export {
  RoomListType,
  ParticipantsType,
  ParticipantsListType,
  ReceiveChatType,
  TranslateTextPropsType,
  TranslateTextReturnType,
  ChatLogsType,
  ParticipantsUpdateType,
  CreatedRoomType,
  SideBarStatus,
  JoiningRoomType,
  CreatingRoomType,
};
