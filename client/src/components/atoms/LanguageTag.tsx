import React from 'react';
import styled from 'styled-components';

import Palette from '../../@types/Palette';

export type LanguageTagPropsType = {
  children: React.ReactNode;
};

const StyledLanguageTag = styled.div<LanguageTagPropsType>`
  width: 24.7px;
  height: 24.7px;
  padding: 3.1px 4.5px 5.9px 4.5px;
  border-radius: 10px;
  border: solid 3px WHITE;
  background-color: ${Palette.PUPAGO_BLUE};
`;

export function LanguageTag({ children }: LanguageTagPropsType) {
  return <StyledLanguageTag>{children}</StyledLanguageTag>;
}

export default LanguageTag;
