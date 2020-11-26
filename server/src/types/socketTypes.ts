type userDataType = {
  roomCode: string;
  nickname: string;
  language: string;
};

type participantsListType = {
  participantsList: string[];
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
};

type roomInfoType = {
  roomCode: string;
  title: string;
  createdAt: string;
};

type roomListType = {
  roomCode: string;
  title: string;
  createdAt: string;
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
};
