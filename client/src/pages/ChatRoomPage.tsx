import React, { useEffect } from 'react';
import styled from 'styled-components';
import dotenv from 'dotenv';
import io from 'socket.io-client';

import ChatLogs from '../components/organisms/chatRoomPage/ChatLogs';
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

function ChatRoomPage() {
  const { onSetParticipantsList } = useParticipantsList();
  const { nicknameData, languageData, socketData, onSetSocketId, onSetSocket, imageLinkData } = useUser();
  const { onStackChats } = useChat();
  const { data: roomData } = useRoom();

  useEffect(() => {
    onSetSocket(io(BASE_URL as string));
  }, []);

  useEffect(() => {
    if (socketData !== null) {
      socketData.emit('enter chatroom', {
        roomCode: roomData.roomCode,
        nickname: nicknameData,
        language: languageData,
        imageLink: imageLinkData,
      });
      socketData.on('receive participants list', (participantsList: string) => {
        onSetSocketId(socketData.id);
        onSetParticipantsList(JSON.parse(participantsList).participantsList);
      });
      socketData.on('receive chat', (receiveChat: string) => {
        onStackChats(JSON.parse(receiveChat));
      });
      socketData.on('socket error', (errorMessage: { errorMessage: string }) => {
        alert(errorMessage);
        // 첫 페이지로 리디렉션
      });
    }
  }, [socketData]);

  return (
    <Wrapper>
      <StyledChatRoomBox>
        <ChatHeader />
        <ChatLogsBox>
          <ChatLogs />
        </ChatLogsBox>
        <ChatInput />
      </StyledChatRoomBox>
      <SideBar />
    </Wrapper>
  );
}

export default ChatRoomPage;
