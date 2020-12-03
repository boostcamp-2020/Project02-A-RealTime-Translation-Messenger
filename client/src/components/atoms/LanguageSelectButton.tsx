import React from 'react';
import styled from 'styled-components';

import Palette from '../../@types/Palette';

export type LanguageSelectButtonPropsType = {
  selected?: boolean;
  language: string;
  onClick?: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void) & (() => void);
};

const StyledButton = styled.button<LanguageSelectButtonPropsType>`
  width: 56px;
  height: 56px;
  outline: none;
  border-radius: 10px;
  border: solid 3px #ffffff;
  background-color: ${(props) => (props.selected ? 'white' : 'transparent')};
  color: ${(props) => (props.selected ? Palette.DARK_GREY : 'white')};
  font-size: 28px;
  cursor: pointer;
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
