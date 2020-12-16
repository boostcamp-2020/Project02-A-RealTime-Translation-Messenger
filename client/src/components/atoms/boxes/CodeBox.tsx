import React from 'react';
import styled from 'styled-components';

import Palette from '../../../@types/Palette';

export type CodeBoxPropsType = {
  isEntered: boolean;
  children: React.ReactNode;
};

const StyledCodeBox = styled.div<CodeBoxPropsType>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 72px;
  height: 72px;
  box-shadow: ${(props) => (props.isEntered ? '3px 3px 10px 0 rgba(0, 0, 0, 0.25)' : 'none')};
  border: solid 3px ${(props) => (props.isEntered ? Palette.PUPAGO_BLUE : 'none')};
  border-radius: 10px;
  background-color: WHITE;
  user-select: none;
`;

const StyledCodeText = styled.p`
  margin: 2px 0 0 0;
  color: ${Palette.PUPAGO_BLUE};
  font-size: 48px;
`;

export function CodeBox({ isEntered, children }: CodeBoxPropsType) {
  return (
    <StyledCodeBox isEntered={isEntered}>
      <StyledCodeText>{children}</StyledCodeText>
    </StyledCodeBox>
  );
}

export default CodeBox;
