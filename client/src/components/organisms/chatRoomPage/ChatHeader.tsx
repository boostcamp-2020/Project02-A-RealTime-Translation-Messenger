import React from 'react';

import ChatRoomHeaderMolecule from '../../molecules/chatRoomPage/ChatRoomHeader';
import useRoom from '../../../hooks/useRoom';
import useUser from '../../../hooks/useUser';
import useChat from '../../../hooks/useChat';
import useChatInput from '../../../hooks/useChatInput';
import useParticipantsList from '../../../hooks/useParticipantsList';
import useNavigation from '../../../hooks/useNavigation';
import MainPageNavigation from '../../../@types/mainPageNavigation';
import { useHistory } from 'react-router-dom';

function ChatHeader() {
  const { data: roomData, onResetRoomState } = useRoom();
  const { onResetSocketId, socketData, onResetSocket } = useUser();
  const { onResetChats } = useChat();
  const { onResetParticipantsList } = useParticipantsList();
  const { onResetChatInput } = useChatInput();
  const { onSetNavigation } = useNavigation();
  const history = useHistory();

  return (
    <>
      <ChatRoomHeaderMolecule
        title={roomData.title}
        roomCode={roomData.roomCode}
        leaveOnClick={() => {
          onResetSocketId();
          onResetChats();
          onResetChatInput();
          onResetParticipantsList();
          onResetRoomState();
          socketData?.disconnect();
          onResetSocket();
          onSetNavigation(MainPageNavigation.USER_INFO);
          history.push('/');
        }}
      />
    </>
  );
}

export default ChatHeader;
