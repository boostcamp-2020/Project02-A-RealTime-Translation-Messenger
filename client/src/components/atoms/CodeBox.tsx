import React from 'react';
import styled from 'styled-components';

import Palette from '../../@types/Palette';

export type CodeBoxPropsType = {
  isEntered: boolean;
  children: React.ReactNode;
};

const StyledCodeBox = styled.div<CodeBoxPropsType>`
  width: 72px;
  height: 72px;
  border-radius: 10px;
  box-shadow: ${(props) => (props.isEntered ? '3px 3px 10px 0 rgba(0, 0, 0, 0.25)' : 'none')};
  border: solid 3px ${(props) => (props.isEntered ? Palette.PUPAGO_BLUE : 'none')};
  background-color: WHITE;
  color: ${Palette.PUPAGO_BLUE};
  font-size: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export function CodeBox({ isEntered, children }: CodeBoxPropsType) {
  return <StyledCodeBox isEntered={isEntered}>{children}</StyledCodeBox>;
}

export default CodeBox;
