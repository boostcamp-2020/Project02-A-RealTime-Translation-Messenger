import React from 'react';
import styled from 'styled-components';

type ChatModalBackgroundPropsType = {
  children?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  ref?: React.RefObject<HTMLDivElement>;
};

const StyledChatModalBackground = styled.div`
  width: 1280px;
  height: 720px;
  border-radius: 30px;
  background-color: rgba(0, 0, 0, 0.4);
`;

export const ChatModalBackground = ({ children, ...props }: ChatModalBackgroundPropsType) => {
  return <StyledChatModalBackground {...props}>{children}</StyledChatModalBackground>;
};

export default ChatModalBackground;
