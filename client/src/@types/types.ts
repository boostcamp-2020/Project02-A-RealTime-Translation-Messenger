type RoomListType = {
  roomCode: string;
  title: string;
  createdAt: string;
  participantCount: number;
  isPrivate: string;
};

type ParticipantsType = {
  socketId: string;
  nickname: string;
  language: string;
};

type ParticipantsListType = {
  participantsList: ParticipantsType[];
  type: string;
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

type TranslateTextPropsType = {
  source: 'ko' | 'en';
  target: 'ko' | 'en';
  text: string;
};

type TranslateTextReturnType = {
  srcLangType: string;
  tarLangType: string;
  translatedText: string;
};

export {
  RoomListType,
  ParticipantsType,
  ParticipantsListType,
  ReceiveChatType,
  TranslateTextPropsType,
  TranslateTextReturnType,
};
