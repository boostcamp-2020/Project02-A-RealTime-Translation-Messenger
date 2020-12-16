import React from 'react';
import styled from 'styled-components';

type ChatModalBackgroundPropsType = {
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

const StyledChatModalBackground = styled.div`
  width: 1280px;
  height: 720px;
  border-radius: 30px;
  background-color: rgba(0, 0, 0, 0.4);
`;

export const ChatModalBackground = ({ ...props }: ChatModalBackgroundPropsType) => {
  return <StyledChatModalBackground {...props} />;
};

export default ChatModalBackground;
