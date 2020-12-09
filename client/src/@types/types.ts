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

export { RoomListType, ParticipantsType, ParticipantsListType, ReceiveChatType, ChatLogsType, ParticipantsUpdateType };
