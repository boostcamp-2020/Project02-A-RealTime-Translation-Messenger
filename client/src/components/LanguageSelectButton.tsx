import React from 'react';
import styled from 'styled-components';

export interface LanguageSelectButtonPropsType {
  selected?: boolean;
  language: string;
}

const Button = styled.button<LanguageSelectButtonPropsType>`
  width: 56px;
  height: 56px;
  border-radius: 10px;
  border: solid 3px #ffffff;
  font-size: 18px;
  color: ${(props) => (props.selected ? '#808080' : '#ffffff')};
  background-color: ${(props) => (props.selected ? '#ffffff' : 'transparent')};
`;

export function LanguageSelectButton({ selected = true, language = 'Korean', ...props }) {
  return (
    <div>
      <Button type="button" selected={selected} language="Korean">
        {language === 'Korean' ? '가' : 'A'}
      </Button>
    </div>
  );
}

export default LanguageSelectButton;
