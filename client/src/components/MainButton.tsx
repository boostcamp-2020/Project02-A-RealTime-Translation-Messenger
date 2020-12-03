import React from 'react';
import styled from 'styled-components';

import Palette from '../@types/Palette';

export type ButtonPropsType = {
  disabled?: boolean;
  onClick?: () => void;
};

const Button = styled.button<ButtonPropsType>`
  display: block;
  width: 336px;
  height: 40px;
  filter: drop-shadow(3px 3px 10px rgba(0, 0, 0, 0.25));
  border-radius: 10px;
  border: none;
  background-color: ${(props) => (props.disabled ? Palette.DISABLED_YELLOW : Palette.ACTIVE_YELLOW)};
  color: ${Palette.DARK_GREY};
  font-size: 18px;
`;

export function MainButton({ disabled = true, children = 'button', ...props }) {
  return (
    <Button type="button" disabled={disabled} {...props}>
      {children}
    </Button>
  );
}

export default MainButton;
