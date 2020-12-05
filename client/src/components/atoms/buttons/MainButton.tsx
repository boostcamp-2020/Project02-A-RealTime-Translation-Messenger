import React from 'react';
import styled from 'styled-components';

import Palette from '../../../@types/Palette';

export type ButtonPropsType = {
  disabled?: boolean;
  onClick?: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void) & (() => void);
  children?: string;
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

const Button = styled.button<ButtonPropsType>`
  display: block;
  width: 336px;
  height: 40px;
  filter: drop-shadow(3px 3px 10px rgba(0, 0, 0, 0.25));
  outline: none;
  border-radius: 10px;
  border: none;
  /* background-color: ${(props) => (props.disabled ? Palette.DISABLED_YELLOW : Palette.ACTIVE_YELLOW)}; */
  background-color: ${(props) => setButtonColor(props.disabled)};
  color: ${Palette.DARK_GREY};
  font-size: 18px;
  cursor: pointer;
`;

export function MainButton({ disabled, children = 'button', ...props }: ButtonPropsType) {
  return (
    <Button type="button" disabled={disabled} {...props}>
      {children}
    </Button>
  );
}

export default MainButton;
