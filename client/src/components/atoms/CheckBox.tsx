import React from 'react';
import styled from 'styled-components';

import Palette from '../../@types/Palette';

export type CheckBoxTypes = {
  isChecked: boolean;
  children?: React.ReactNode;
  onClick?: () => (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

const StyledCheckBox = styled.div<CheckBoxTypes>`
  width: 16px;
  height: 16px;

  border: solid 1px ${Palette.DARK_GREY};
  background-color: ${(props) => (props.isChecked ? Palette.PUPAGO_BLUE : 'transparent')};
  border-radius: 2px;

  cursor: pointer;
`;

const StyledChoiceText = styled.p`
  margin: 0;
  padding-left: 6px;
  color: ${Palette.DARK_GREY};
  font-size: 14px;
`;

const CheckBoxWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export function CheckBox({ isChecked = false, children, ...props }: CheckBoxTypes) {
  return (
    <CheckBoxWrapper>
      <StyledCheckBox isChecked={isChecked} {...props} />
      <StyledChoiceText>{children}</StyledChoiceText>
    </CheckBoxWrapper>
  );
}

export default CheckBox;
