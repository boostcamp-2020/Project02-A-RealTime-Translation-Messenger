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

type CreatedRoomType = {
  roomCode: string | null;
  title: string | null;
  isPrivate: string | null;
};

type UserStateType = {
  nickname: string | null;
  language: string | null;
  imageLink: string | null;
};

export { RoomListType, ParticipantsType, ParticipantsListType, ReceiveChatType, CreatedRoomType, UserStateType };
