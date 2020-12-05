import React from 'react';
import styled from 'styled-components';

import Palette from '../../../@types/Palette';

const StyledChatModalBox = styled.div`
  width: 400px;
  height: 240px;
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  background-color: ${Palette.LIGHT_GREY};
`;

export const ChatModalBox = () => {
  return <StyledChatModalBox />;
};

export default ChatModalBox;
