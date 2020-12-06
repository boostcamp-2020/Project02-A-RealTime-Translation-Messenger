import React from 'react';
import styled from 'styled-components';

import Palette from '../../../@types/Palette';

type ChatModalPropsType = {
  children?: React.ReactNode;
};

const StyledChatModalBox = styled.div`
  width: 400px;
  height: 240px;
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  background-color: ${Palette.LIGHT_GREY};
`;

export const ChatModalBox = ({ children }: ChatModalPropsType) => {
  return <StyledChatModalBox>{children}</StyledChatModalBox>;
};

export default ChatModalBox;
