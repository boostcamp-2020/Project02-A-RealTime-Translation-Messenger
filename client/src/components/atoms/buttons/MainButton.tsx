import React from 'react';
import styled from 'styled-components';

import Palette from '../../../@types/Palette';

export type ButtonPropsType = {
  disabled?: boolean;
  onClick?: () => void;
  children?: string;
};

const Button = styled.button<ButtonPropsType>`
  display: block;
  width: 336px;
  height: 40px;
  filter: drop-shadow(3px 3px 10px rgba(0, 0, 0, 0.25));
  outline: none;
  border-radius: 10px;
  border: none;
  background-color: ${(props) => (props.disabled ? Palette.DISABLED_YELLOW : Palette.ACTIVE_YELLOW)};
  color: ${Palette.DARK_GREY};
  font-size: 18px;
  cursor: pointer;
`;

export function MainButton({ disabled = true, children = 'button', ...props }: ButtonPropsType) {
  return (
    <Button type="button" disabled={disabled} {...props}>
      {children}
    </Button>
  );
}

export default MainButton;
