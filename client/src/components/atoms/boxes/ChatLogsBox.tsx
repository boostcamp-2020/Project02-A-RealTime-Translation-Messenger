import React from 'react';
import styled from 'styled-components';

export type ChatLogsBoxPropsType = {
  children: React.ReactNode;
};

const StyledChatLogsBox = styled.div<ChatLogsBoxPropsType>`
  width: 1000px;
  height: 472px;
  padding: 0 24px;
  background-color: white;
  overflow-y: scroll;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    width: 0px;
  }
`;

function ChatLogsBox({ children }: ChatLogsBoxPropsType) {
  return <StyledChatLogsBox>{children}</StyledChatLogsBox>;
}

export default ChatLogsBox;
