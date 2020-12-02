import React from 'react';
import styled from 'styled-components';

export interface ButtonPropsType {
  disabled?: boolean;
  onClick?: () => void;
}

const Button = styled.button<ButtonPropsType>`
  width: 336px;
  height: 40px;
  border-radius: 10px;
  border: none;
  color: #808080;
  font-size: 18px;
  background-color: ${(props) => (props.disabled ? '#d6b400' : '#ffd700')};
  filter: drop-shadow(3px 3px 10px rgba(0, 0, 0, 0.25));
`;

export function MainButton({ disabled = true, children = 'button', ...props }) {
  return (
    <div>
      <Button type="button" disabled={disabled}>
        {children}
      </Button>
    </div>
  );
}

export default MainButton;
