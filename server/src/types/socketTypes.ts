type userDataType = {
  roomCode: string;
  nickname: string;
  language: string;
};

type participantsType = {
  socketId: string;
  nickname: string;
  language: string;
};

type participantsListType = {
  participantsList: participantsType[];
  type: string;
};

type sendChatType = {
  Korean: string;
  English: string;
};

type receiveChatType = {
  Korean: string;
  English: string;
  senderId: string;
  nickname: string;
  createdAt: string;
};

type roomInfoType = {
  roomCode: string;
  title: string;
  createdAt: string;
  isPrivate: string;
};

type roomListType = {
  roomCode: string;
  title: string;
  createdAt: string;
  isPrivate: string;
  participantCount: number;
};

type createdRoomType = {
  roomCode: string;
  title: string;
  isPrivate: string;
};

export {
  userDataType,
  participantsListType,
  sendChatType,
  receiveChatType,
  roomInfoType,
  roomListType,
  createdRoomType,
  participantsType,
};
