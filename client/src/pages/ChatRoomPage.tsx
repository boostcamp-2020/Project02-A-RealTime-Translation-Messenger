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
import useChatInput from '../hooks/useChatInput';
import useNavigation from '../hooks/useNavigation';
import MainPageNavigation from '../@types/mainPageNavigation';
import { useHistory } from 'react-router-dom';

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
  const { onSetParticipantsList, onResetParticipantsList } = useParticipantsList();
  const {
    nicknameData,
    languageData,
    socketData,
    onSetSocketId,
    onSetSocket,
    onResetSocketId,
    onResetSocket,
    imageLinkData,
  } = useUser();
  const { onStackChats, onResetChats } = useChat();
  const { data: roomData, onResetRoomState } = useRoom();
  const { onResetChatInput } = useChatInput();
  const { onSetNavigation } = useNavigation();
  const history = useHistory();

  useEffect(() => {
    onSetSocket(io(BASE_URL as string));
  }, []);

  useEffect(() => {
    if (socketData !== null) {
      socketData.emit('enter chatroom', {
        roomCode: roomData.roomCode,
        nickname: nicknameData,
        language: languageData === 'ko' ? 'Korean' : 'English',
        imageLink: imageLinkData,
      });
      socketData.on('receive participants list', (participantsList: string) => {
        onSetSocketId(socketData.id);
        const participants = JSON.parse(participantsList);
        onSetParticipantsList(participants.participantsList);
        onStackChats({ type: participants.type, diffNickname: participants.diffNickname });
      });
      socketData.on('receive chat', (receiveChat: string) => {
        onStackChats(JSON.parse(receiveChat));
      });
      socketData.on('socket error', (errorMessage: { errorMessage: string }) => {
        alert(errorMessage);
        onResetSocketId();
        onResetChats();
        onResetChatInput();
        onResetParticipantsList();
        onResetRoomState();
        onSetNavigation(MainPageNavigation.USER_INFO);
        socketData.disconnect();
        onResetSocket();
        history.push('/');
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
