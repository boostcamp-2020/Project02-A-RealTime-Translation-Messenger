import React, { useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { useIntl } from 'react-intl';

import ChatRoomHeaderMolecule from '../../molecules/chatRoomPage/ChatRoomHeader';
import useRoom from '../../../hooks/useRoom';
import useUser from '../../../hooks/useUser';
import useChat from '../../../hooks/useChat';
import useChatInput from '../../../hooks/useChatInput';
import useParticipantsList from '../../../hooks/useParticipantsList';
import useNavigation from '../../../hooks/useNavigation';
import MainPageNavigation from '../../../@types/mainPageNavigation';

function ChatHeader() {
  const { data: roomData, onResetRoomState } = useRoom();
  const { onResetSocketId, socketData, onResetSocket } = useUser();
  const { onResetChats } = useChat();
  const { onResetParticipantsList } = useParticipantsList();
  const { onResetChatInput } = useChatInput();
  const { onSetNavigation } = useNavigation();
  const clipBoardTextArea = useRef<HTMLTextAreaElement>(null);
  const history = useHistory();
  const { formatMessage } = useIntl();

  const copyToClipboard = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (clipBoardTextArea.current !== null) {
      clipBoardTextArea.current.select();
      document.execCommand('copy');
      alert(formatMessage({ id: 'copiedToTheClipboard' }));
    }
  };

  return (
    <>
      <ChatRoomHeaderMolecule
        title={roomData.title}
        roomCode={roomData.roomCode}
        leaveOnClick={() => {
          if (!window.confirm(formatMessage({ id: 'leaveRoomMessage' }))) return;
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
        roomCodeOnClickFunc={copyToClipboard}
        clipBoardRef={clipBoardTextArea}
      />
    </>
  );
}

export default ChatHeader;
