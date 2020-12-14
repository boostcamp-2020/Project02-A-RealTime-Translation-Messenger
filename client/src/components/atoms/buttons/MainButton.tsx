import React from 'react';
import styled from 'styled-components';

import Palette from '../../../@types/Palette';

export type ButtonPropsType = {
  disabled?: boolean;
  onClickButton: () => void;
  children: string;
};

type StyledButtonPropsType = {
  disabled?: boolean;
  onClick: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void) & (() => void);
  children: string;
};

const setButtonColor = (disabled: boolean | undefined) => {
  switch (disabled) {
    case true:
      return Palette.DISABLED_YELLOW;
    case false:
      return Palette.ACTIVE_YELLOW;
    default:
      return 'white';
  }
};

const Button = styled.button<StyledButtonPropsType>`
  display: block;
  width: 344px;
  height: 40px;
  filter: drop-shadow(3px 3px 10px rgba(0, 0, 0, 0.25));
  outline: none;
  border-radius: 10px;
  border: none;
  background-color: ${(props) => setButtonColor(props.disabled)};
  color: ${Palette.DARK_GREY};
  font-size: 18px;
  ${(props) => (props.disabled ? '' : 'cursor: pointer;')}
`;

export function MainButton({ disabled, children, onClickButton }: ButtonPropsType) {
  return (
    <Button
      type="button"
      disabled={disabled}
      onClick={() => {
        if (!disabled) {
          onClickButton();
        }
      }}
    >
      {children}
    </Button>
  );
}

export default MainButton;
