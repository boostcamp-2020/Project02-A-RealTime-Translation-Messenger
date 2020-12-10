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
  width: 952px;
`;

const ParticipantLogWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: inherit;
`;

function ChatLogs() {
  const { data: chatLogs } = useChat();
  const { nicknameData, languageData, socketIdData } = useUser();

  const returnLogs = () => {
    if (chatLogs.length === 0) {
      return <></>;
    } else {
      return chatLogs.map((data, index) => {
        const log = data as ParticipantsUpdateType;
        if (log.type === undefined) {
          const chatLog = data as ChatLogsType;
          console.log(data);
          return (
            <ChatLogWrapper isMe={socketIdData === chatLog.senderId}>
              <ChatItemMolecule
                key={index}
                leftMessage={languageData === 'Korean' ? chatLog.Korean : chatLog.English}
                rightMessage={languageData === 'Korean' ? chatLog.English : chatLog.Korean}
                isMe={socketIdData === chatLog.senderId}
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
                key={index}
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
