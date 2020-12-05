import React from 'react';
import styled from 'styled-components';

const StyledChatModalBackground = styled.div`
  width: 1280px;
  height: 720px;
  border-radius: 30px;
  background-color: rgba(0, 0, 0, 0.4);
`;

export const ChatModalBackground = () => {
  return <StyledChatModalBackground />;
};

export default ChatModalBackground;
