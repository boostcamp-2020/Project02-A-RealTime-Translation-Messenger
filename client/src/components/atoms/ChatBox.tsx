import React from 'react';
import styled from 'styled-components';

import Palette from '../../@types/Palette';

type StyledChatBoxPropsType = {
  isMe: boolean;
};

const StyledChatBoxWrapper = styled.div`
  display: flex;
`;

const StyledChatBox = styled.div<StyledChatBoxPropsType>`
  padding: 16px;

  min-width: 199px;
  max-width: 399px;

  height: 88px;

  background-color: ${(props) => (props.isMe ? Palette.PUPAGO_BLUE : Palette.LIGHT_GREY)};

  color: ${(props) => (props.isMe ? 'white' : 'black')};
  font-size: 14px;
`;

const LeftBox = styled(StyledChatBox)`
  margin-right: 2px;

  border-radius: 10px 0 0 10px;
`;

const RightBox = styled(StyledChatBox)`
  border-radius: 0 10px 10px 0;
`;
export type ChatBoxPropsType = {
  leftMessage: string;
  rightMessage: string;
  isMe: boolean;
};

export function ChatBox({ leftMessage = '', rightMessage = '', isMe }: ChatBoxPropsType) {
  return (
    <StyledChatBoxWrapper>
      <LeftBox isMe={isMe}>{leftMessage}</LeftBox>
      <RightBox isMe={isMe}>{rightMessage}</RightBox>
    </StyledChatBoxWrapper>
  );
}

export default ChatBox;
