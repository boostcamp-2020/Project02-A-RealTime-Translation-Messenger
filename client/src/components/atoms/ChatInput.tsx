import React from 'react';
import styled from 'styled-components';
import Palette from '../../@types/Palette';

const StyledChatInput = styled.textarea`
  display: block;

  padding: 25px;

  width: 476px;
  height: 96px;

  outline: none;
  border: none;
  border-radius: 30px 0 0 0;

  background-color: ${Palette.ALMOST_WHITE};

  resize: none;
  overflow: hidden;

  font-family: 'Noto Sans KR', sans-serif;
  font-size: 14px;
  line-height: 20px;
`;

export type ChatInputPropsType = {
  value: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

function ChatInput({ value, onChange }: ChatInputPropsType) {
  return <StyledChatInput onChange={onChange} value={value} />;
}

export default ChatInput;
