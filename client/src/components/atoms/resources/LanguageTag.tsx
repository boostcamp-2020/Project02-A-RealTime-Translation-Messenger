import React from 'react';
import styled from 'styled-components';

import Palette from '../../../@types/Palette';

export type LanguageTagPropsType = {
  language: 'Korean' | 'English';
  isMe: boolean;
};

const StyledLanguageTag = styled.div<LanguageTagPropsType>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  border: solid 3px white;
  border-radius: 10px;
  background-color: ${(props) => (props.isMe ? Palette.PUPAGO_BLUE : 'none')};
  font-size: 14px;
  color: white;
`;

export function LanguageTag({ language, isMe }: LanguageTagPropsType) {
  return (
    <StyledLanguageTag language={language} isMe={isMe}>
      {language === 'Korean' ? '가' : 'A'}
    </StyledLanguageTag>
  );
}

export default LanguageTag;
