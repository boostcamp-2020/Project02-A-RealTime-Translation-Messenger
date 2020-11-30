type UserDataType = {
  roomCode: string;
  nickname: string;
  language: string;
};

type ParticipantsType = {
  socketId: string;
  nickname: string;
  language: string;
};

type ParticipantsListType = {
  participantsList: ParticipantsType[];
  type: string;
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
  createdAt: string;
};

type RoomInfoType = {
  roomCode: string;
  title: string;
  createdAt: string;
  isPrivate: string;
};

type RoomListType = {
  roomCode: string;
  title: string;
  createdAt: string;
  isPrivate: string;
  participantCount: number;
};

type CreatedRoomType = {
  roomCode: string;
  title: string;
  isPrivate: string;
};

export {
  UserDataType,
  ParticipantsListType,
  SendChatType,
  ReceiveChatType,
  RoomInfoType,
  RoomListType,
  CreatedRoomType,
  ParticipantsType,
};
