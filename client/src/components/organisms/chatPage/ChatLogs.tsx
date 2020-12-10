import React from 'react';
import styled from 'styled-components';

import useChat from '../../../hooks/useChat';
import ChatItemMolecule from '../../molecules/chatRoomPage/ChatItem';
import ParticipantNotification from '../../atoms/texts/ParticipantNotification';
import { ChatLogsType, ParticipantsUpdateType } from '../../../@types/types';
import useUser from '../../../hooks/useUser';

type ChatLogWrapperType = {
  isMe: boolean;
};

const ChatLogWrapper = styled.div<ChatLogWrapperType>`
  display: flex;
  justify-content: ${(props) => (props.isMe ? 'flex-end' : 'flex-start')};
  width: inherit;
`;

const ParticipantLogWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: inherit;
`;

function ChatLogs() {
  const { data: chatLogs } = useChat();
  const { nicknameData, languageData } = useUser();

  const returnLogs = () => {
    if (chatLogs.length === 0) {
      return <></>;
    } else {
      return chatLogs.map((data) => {
        const log = data as ParticipantsUpdateType;
        if (log.type === undefined) {
          const chatLog = data as ChatLogsType;
          return (
            <ChatLogWrapper isMe={nicknameData === chatLog.nickname ? true : false}>
              <ChatItemMolecule
                leftMessage={languageData === 'Korean' ? chatLog.Korean : chatLog.English}
                rightMessage={languageData === 'Korean' ? chatLog.English : chatLog.Korean}
                isMe={nicknameData === chatLog.nickname ? true : false}
                imageLink={chatLog.imageLink}
                nickname={chatLog.nickname}
                createdAt={chatLog.createdAt}
              />
            </ChatLogWrapper>
          );
        } else {
          return (
            <ParticipantLogWrapper>
              <ParticipantNotification
                nickname={log.diffNickname}
                isEnter={log.type === 'enter' ? true : false}
                language={languageData}
              />
            </ParticipantLogWrapper>
          );
        }
      });
    }
  };

  return <>{returnLogs()}</>;
}

export default ChatLogs;
