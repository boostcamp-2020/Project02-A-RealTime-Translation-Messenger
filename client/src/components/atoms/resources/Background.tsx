import React from 'react';
import styled from 'styled-components';

import Palette from '../../../@types/Palette';

const StyledBackground = styled.div`
  position: fixed;
  z-index: -1;
  width: 100vw;
  height: 100vh;
  background-image: linear-gradient(to right, ${Palette.PUPAGO_BLUE}, ${Palette.PUPAGO_GREEN});
`;

export function Background({ children = 'button', ...props }) {
  return <StyledBackground />;
}

export default Background;
