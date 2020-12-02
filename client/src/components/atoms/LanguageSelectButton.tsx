import React from 'react';
import styled from 'styled-components';

import Palette from '../../@types/Palette';

export interface LanguageSelectButtonPropsType {
  selected?: boolean;
  language: string;
  onClick?: () => void;
}

const StyledButton = styled.button<LanguageSelectButtonPropsType>`
  width: 56px;
  height: 56px;
  border-radius: 10px;
  border: solid 3px #ffffff;
  font-size: 28px;
  color: ${(props) => (props.selected ? Palette.DARK_GREY : 'white')};
  background-color: ${(props) => (props.selected ? 'white' : 'transparent')};
`;

export function LanguageSelectButton({
  selected = true,
  language = 'Korean',
  ...props
}: LanguageSelectButtonPropsType) {
  return (
    <div>
      <StyledButton type="button" selected={selected} language={language} {...props}>
        {language === 'Korean' ? '가' : 'A'}
      </StyledButton>
    </div>
  );
}

export default LanguageSelectButton;
