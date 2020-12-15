import React from 'react';
import styled from 'styled-components';

import LangCode from '../../../@types/langCode';
import Palette from '../../../@types/Palette';

export type LanguageTagPropsType = {
  language: LangCode;
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
      {language === LangCode.KOREAN ? '가' : 'A'}
    </StyledLanguageTag>
  );
}

export default LanguageTag;
