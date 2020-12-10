import React from 'react';
import styled from 'styled-components';
import Palette from '../../../@types/Palette';

const StyledChatInput = styled.textarea`
  display: block;
  width: 476px;
  height: 128px;
  padding: 25px;
  margin-left: 4px;
  outline: none;
  border: none;
  border-radius: 0 30px 30px 0;
  background-color: ${Palette.ALMOST_WHITE};
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 14px;
  line-height: 20px;
  resize: none;
  overflow: hidden;
`;

export type ChatInputPropsType = {
  value: string;
  onChangeTranslation?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

function ChatInput({ value, onChangeTranslation }: ChatInputPropsType) {
  return <StyledChatInput readOnly={true} onChange={onChangeTranslation} value={value} />;
}

export default ChatInput;
