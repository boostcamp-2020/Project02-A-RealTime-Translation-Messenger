import React, { useEffect } from 'react';
import styled from 'styled-components';
import dotenv from 'dotenv';
import io from 'socket.io-client';

import ChatLogs from '../components/organisms/chatPage/ChatLogs';
import { ParticipantsListType, ReceiveChatType } from '../@types/types';
import ChatHeader from '../components/organisms/chatPage/ChatHeader';
import ChatLogsBox from '../components/atoms/boxes/ChatLogsBox';

dotenv.config();

const { BASE_URL } = process.env;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

const StyledChatRoomBox = styled.div`
  width: 1280px;
  height: 720px;
  box-shadow: 5px 5px 100px 0 rgba(0, 0, 0, 0.25);
  border-radius: 30px;
  background-color: rgba(255, 255, 255, 0.6);
`;

function ChatPage() {
  const socket = io(BASE_URL as string);
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

  return (
    <Wrapper>
      <StyledChatRoomBox>
        <ChatHeader />
        <ChatLogsBox>
          <ChatLogs />
        </ChatLogsBox>
      </StyledChatRoomBox>
    </Wrapper>
  );
}

export default ChatPage;
