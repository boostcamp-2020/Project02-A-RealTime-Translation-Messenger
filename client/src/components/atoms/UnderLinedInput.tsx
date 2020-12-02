import React from 'react';
import styled from 'styled-components';
import palette from '../../@types/Palette';

const StyledUnderLinedInput = styled.input`
  display: block;

  outline: none;
  border: none;
  border-bottom: 1px solid ${palette.PUPAGO_BLUE};

  width: 344px;

  font-size: 12px;
`;

export type StyledUnderLinedInputPropsType = {
  size: number;
  weight: string;
  color: string;
};

export type UnderLinedInputType = {
  value?: string;
  placeholder?: string;
  onChange?: ((event: React.ChangeEvent<HTMLInputElement>) => void) | undefined;
  maxLength: number;
};

function UnderLinedInput({ value = '', placeholder = '', onChange = undefined, maxLength }: UnderLinedInputType) {
  return <StyledUnderLinedInput value={value} placeholder={placeholder} onChange={onChange} />;
}

export default UnderLinedInput;
