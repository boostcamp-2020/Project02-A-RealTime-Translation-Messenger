type UserType = {
  roomCode: string;
  nickname: string;
  language: string;
  imageLink: string;
};

type ParticipantType = {
  socketId: string;
  nickname: string;
  language: string;
};

type ParticipantsListType = {
  participants: ParticipantType[];
  type: string;
  diffNickname: string;
};

type SendChatType = {
  Korean: string;
  English: string;
  origin: string;
};

type ReceiveChatType = {
  Korean: string;
  English: string;
  senderId: string;
  nickname: string;
  imageLink: string;
  createdAt: string;
};

type RoomType = {
  roomCode: string;
  title: string;
  createdAt: string;
  isPrivate: string;
};

export { UserType, ParticipantType, ParticipantsListType, SendChatType, ReceiveChatType, RoomType };
