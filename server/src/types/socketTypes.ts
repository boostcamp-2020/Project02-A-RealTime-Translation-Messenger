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
};

export { userDataType, participantsType, participantsListType, sendChatType, receiveChatType };
