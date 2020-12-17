import React from 'react';
import styled from 'styled-components';

import LangCode from '../../../@types/langCode';
import Palette from '../../../@types/Palette';

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
  background-color: ${(props) => (props.selected ? Palette.WHITE : 'transparent')};
  color: ${(props) => (props.selected ? Palette.DARK_GREY : Palette.WHITE)};
  font-size: 28px;
  cursor: pointer;
`;

function LanguageSelectButton({
  selected = true,
  language = LangCode.KOREAN,
  ...props
}: LanguageSelectButtonPropsType) {
  return (
    <div>
      <StyledButton type="button" selected={selected} language={language} {...props}>
        {language === LangCode.KOREAN ? '가' : 'A'}
      </StyledButton>
    </div>
  );
}

export default LanguageSelectButton;
