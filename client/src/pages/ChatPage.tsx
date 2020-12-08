import React, { useEffect } from 'react';
import dotenv from 'dotenv';

import { ParticipantsListType, ReceiveChatType } from '../@types/types';
dotenv.config();

const { BASE_URL } = process.env;
const socket = io(BASE_URL as string);

function ChatPage() {
  useEffect(() => {
    socket.on('receive participants list', (participantsList: ParticipantsListType) => {
      // participants 상태 업데이트
      // 채팅에 입장/퇴장 로그 추가
    });
    socket.on('receive chat', (receiveChat: ReceiveChatType) => {
      // 채팅 로그에 추가
    });
    socket.on('socket error', (errorMessage: { errorMessage: string }) => {
      alert(errorMessage);
      // 첫 페이지로 리디렉션
    });
  }, []);

  return <div></div>;
}

export default ChatPage;
