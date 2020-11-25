type userDataType = {
  nickname: string;
  language: string;
  roomId: string;
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

export { userDataType, participantsListType, sendChatType, receiveChatType };
