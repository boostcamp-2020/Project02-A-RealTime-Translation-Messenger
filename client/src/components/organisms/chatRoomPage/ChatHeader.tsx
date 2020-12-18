import React, { useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { useIntl } from 'react-intl';

import ChatRoomHeaderMolecule from '../../molecules/chatRoomPage/ChatRoomHeader';
import useRoom from '../../../hooks/useRoom';
import useUser from '../../../hooks/useUser';
import useNavigation from '../../../hooks/useNavigation';
import MainPageNavigation from '../../../@types/mainPageNavigation';
import useReset from '../../../hooks/useReset';

function ChatHeader() {
  const { data: roomData } = useRoom();
  const { socketData } = useUser();
  const { onSetNavigation } = useNavigation();
  const clipBoardTextArea = useRef<HTMLTextAreaElement>(null);
  const history = useHistory();
  const { formatMessage } = useIntl();
  const { onResetStates } = useReset();

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
          socketData?.disconnect();
          onResetStates();
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
