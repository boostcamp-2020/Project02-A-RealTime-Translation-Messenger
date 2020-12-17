import React from 'react';
import styled from 'styled-components';
import Palette from '../../../@types/Palette';

import palette from '../../../@types/Palette';

const StyledUnderLinedInput = styled.input<StyledUnderLinedInputPropsType>`
  display: block;
  width: 336px;
  outline: none;
  border: none;
  border-bottom: 1px solid ${palette.PUPAGO_BLUE};
  background-color: transparent;
  font-size: 18px;
  color: ${(props) => (props.valid ? Palette.BLACK : 'red')};
`;

export type StyledUnderLinedInputPropsType = {
  valid: boolean;
};

export type UnderLinedInputType = {
  value: string;
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  maxLength: number;
  valid: boolean;
};

function UnderLinedInput({ value = '', placeholder = '', onChange = undefined, valid = true }: UnderLinedInputType) {
  return (
    <StyledUnderLinedInput type="text" value={value} placeholder={placeholder} onChange={onChange} valid={valid} />
  );
}

export default UnderLinedInput;
