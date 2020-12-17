import React, { useEffect } from 'react';
import styled from 'styled-components';
import io from 'socket.io-client';
import { useHistory, useLocation } from 'react-router-dom';

import ChatLogs from '../components/organisms/chatRoomPage/ChatLogs';
import SideBar from '../components/organisms/chatRoomPage/SideBar';
import useParticipantsList from '../hooks/useParticipantsList';
import ChatHeader from '../components/organisms/chatRoomPage/ChatHeader';
import ChatLogsBox from '../components/atoms/boxes/ChatLogsBox';
import ChatInput from '../components/organisms/chatRoomPage/ChatInput';
import useUser from '../hooks/useUser';
import useRoom from '../hooks/useRoom';
import useChat from '../hooks/useChat';
import useNavigation from '../hooks/useNavigation';
import MainPageNavigation from '../@types/mainPageNavigation';
import LangCode from '../@types/langCode';
import { LangCodeFormattedForServer } from '../@types/types';
import useReset from '../hooks/useReset';

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

const StyledChatRoomBox = styled.div`
  width: 1000px;
  height: 720px;
  box-shadow: 5px 5px 100px 0 rgba(0, 0, 0, 0.25);
  border-radius: 30px 0 0 30px;
  background-color: rgba(255, 255, 255, 0.6);
`;

function ChatRoomPage() {
  const { data: participantsList, onSetParticipantsList } = useParticipantsList();
  const { nicknameData, languageData, socketData, onSetSocketId, onSetSocket, imageLinkData } = useUser();
  const { onStackChats } = useChat();
  const { data: roomData } = useRoom();
  const { onSetNavigation } = useNavigation();
  const { onResetStates } = useReset();
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (socketData !== null) {
      history.replace('/');
      return;
    }
    onSetSocket(io(process.env.BASE_URL as string));
  }, [location]);

  useEffect(() => {
    if (socketData !== null && participantsList.length === 0) {
      socketData.emit('enter chatroom', {
        roomCode: roomData.roomCode,
        nickname: nicknameData,
        language:
          languageData === LangCode.KOREAN ? LangCodeFormattedForServer.KOREAN : LangCodeFormattedForServer.ENGLISH,
        imageLink: imageLinkData,
      });
      socketData.on('receive participants list', (participantsList: string) => {
        onSetSocketId(socketData.id);
        const participants: any = participantsList;
        onSetParticipantsList(participants.participants);
        onStackChats({ type: participants.type, diffNickname: participants.diffNickname });
      });
      socketData.on('receive chat', (receiveChat: any) => {
        onStackChats(receiveChat);
      });
      socketData.on('socket error', (errorMessage: { errorMessage: string }) => {
        alert(errorMessage);
        socketData.disconnect();
        onResetStates();
        onSetNavigation(MainPageNavigation.USER_INFO);
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
