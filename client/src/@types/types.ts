import LangCode from './langCode';

type RoomListType = {
  roomCode: string;
  title: string;
  createdAt: string;
  participantCount: number;
  isPrivate: boolean;
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
  isPrivate: boolean;
};

type CreatedRoomResponseType = {
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
  isPrivate: boolean;
};

type CreatingRoomType = {
  title: string;
  isPrivate: boolean;
};

enum SideBarStatus {
  PARTICIPANTS,
  CHAT_ROOMS,
}

enum LangCodeFormattedForServer {
  KOREAN = 'Korean',
  ENGLISH = 'English',
}

enum TranslationCycle {
  PROCESS,
  DONE,
}

enum Size {
  BIG,
  SMALL,
}

enum TextSize {
  SMALL = 12,
  NORMAL = 14,
  BIG = 18,
  MEGA = 24,
}

enum IconType {
  EDIT,
  ARROW_BACK,
  SEND,
  MIC,
  LEAVE,
  CLOSE,
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
  CreatedRoomResponseType,
  SideBarStatus,
  JoiningRoomType,
  CreatingRoomType,
  LangCodeFormattedForServer,
  TranslationCycle,
  Size,
  TextSize,
  IconType,
};
