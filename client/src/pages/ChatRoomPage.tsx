import React, { useEffect } from 'react';
import styled from 'styled-components';
import dotenv from 'dotenv';
import io from 'socket.io-client';

import ChatLogs from '../components/organisms/chatRoomPage/ChatLogs';
import { ParticipantsListType, ReceiveChatType } from '../@types/types';
import SideBar from '../components/organisms/chatRoomPage/SideBar';
import useParticipantsList from '../hooks/useParticipantsList';
import ChatHeader from '../components/organisms/chatRoomPage/ChatHeader';
import ChatLogsBox from '../components/atoms/boxes/ChatLogsBox';
import ChatInput from '../components/organisms/chatRoomPage/ChatInput';
import useUser from '../hooks/useUser';
import useRoom from '../hooks/useRoom';
import useChat from '../hooks/useChat';

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
  position: relative;
  width: 1000px;
  height: 720px;
  box-shadow: 5px 5px 100px 0 rgba(0, 0, 0, 0.25);
  border-radius: 30px 0 0 30px;
  background-color: rgba(255, 255, 255, 0.6);
`;

const socket = io(BASE_URL as string);

function ChatPage() {
  const { onSetParticipantsList } = useParticipantsList();
  const { nicknameData, languageData, onSetSocketId, imageLinkData } = useUser();
  const { onStackChats } = useChat();
  const { data: roomData } = useRoom();

  useEffect(() => {
    socket.emit('enter chatroom', {
      roomCode: roomData.roomCode,
      nickname: nicknameData,
      language: languageData,
      imageLink: imageLinkData,
    });
    socket.on('receive participants list', (participantsList: string) => {
      onSetSocketId(socket.id);
      onSetParticipantsList(JSON.parse(participantsList).participantsList);
      // 채팅에 입장/퇴장 로그 추가
    });
    socket.on('receive chat', (receiveChat: string) => {
      // 채팅 로그에 추가
      onStackChats(JSON.parse(receiveChat));
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
        <ChatInput socket={socket} />
      </StyledChatRoomBox>
      <SideBar />
    </Wrapper>
  );
}

export default ChatPage;
