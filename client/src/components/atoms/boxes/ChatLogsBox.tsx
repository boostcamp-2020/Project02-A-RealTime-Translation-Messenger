import React from 'react';
import styled from 'styled-components';

export type ChatLogsBoxPropsType = {
  children: React.ReactNode;
};

const StyledChatLogsBox = styled.div<ChatLogsBoxPropsType>`
  width: 1000px;
  height: 520px;
  padding: 32px;
  background-color: white;
`;

export function ChatLogsBox({ children }: ChatLogsBoxPropsType) {
  return <StyledChatLogsBox>{children}</StyledChatLogsBox>;
}

export default ChatLogsBox;
