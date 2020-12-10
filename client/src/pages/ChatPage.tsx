import React, { useEffect } from 'react';
import dotenv from 'dotenv';
import io from 'socket.io-client';

import { ParticipantsListType, ReceiveChatType } from '../@types/types';
import SideBar from '../components/organisms/chatRoomPage/SideBar';
import useParticipantsList from '../hooks/useParticipantsList';

dotenv.config();

const { BASE_URL } = process.env;
const socket = io(BASE_URL as string);

function ChatPage() {
  const { onSetParticipantsList } = useParticipantsList();

  useEffect(() => {
    socket.on('receive participants list', (participantsList: ParticipantsListType) => {
      onSetParticipantsList(participantsList.participantsList);
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

  return <SideBar />;
}

export default ChatPage;
