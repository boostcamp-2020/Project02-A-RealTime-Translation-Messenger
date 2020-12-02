import { PaletteRounded } from '@material-ui/icons';
import React from 'react';
import styled from 'styled-components';

import Palette from '../../@types/Palette';

export type CodeBoxPropsType = {
  disabled: boolean;
};

const StyledCodeBox = styled.div<CodeBoxPropsType>`
  width: 72px;
  height: 72px;
  padding: 8px 8px 12px;
  border-radius: 10px;
  box-shadow: 3px 3px 10px 0 rgba(0, 0, 0, 0.25);
  border: solid 3px ${(props) => (props.disabled ? 'WHITE' : Palette.PUPAGO_BLUE)};
  background-color: WHITE;
`;

export function CodeBox({ disabled }: CodeBoxPropsType) {
  return <StyledCodeBox disabled={disabled}></StyledCodeBox>;
}

export default CodeBox;
