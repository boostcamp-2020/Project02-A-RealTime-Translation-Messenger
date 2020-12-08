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

export { RoomListType, ParticipantsType, ParticipantsListType, ReceiveChatType };
