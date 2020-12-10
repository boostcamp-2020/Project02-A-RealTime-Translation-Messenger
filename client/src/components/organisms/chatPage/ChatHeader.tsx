import React from 'react';

import ChatRoomHeaderMolecule from '../../molecules/chatRoomPage/ChatRoomHeader';
import useRoom from '../../../hooks/useRoom';
import useNavigation from '../../../hooks/useNavigation';
import MainPageNavigation from '../../../@types/mainPageNavigation';
import { useHistory } from 'react-router-dom';

function ChatHeader() {
  const { data: roomData } = useRoom();
  const { onSetNavigation } = useNavigation();
  const history = useHistory();

  return (
    <>
      <ChatRoomHeaderMolecule
        title={roomData.title}
        roomCode={roomData.roomCode}
        leaveOnClick={() => {
          onSetNavigation(MainPageNavigation.USER_INFO);
          history.push('/');
        }}
      />
    </>
  );
}

export default ChatHeader;
