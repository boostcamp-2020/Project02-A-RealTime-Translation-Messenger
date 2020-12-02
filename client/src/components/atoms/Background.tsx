import React from 'react';
import styled from 'styled-components';

import Palette from '../../@types/Palette';

const StyledBackground = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  background-image: linear-gradient(to right, ${Palette.PUPAGO_BLUE}, ${Palette.PUPAGO_GREEN});
`;

export function Background({ disabled = true, children = 'button', ...props }) {
  return <StyledBackground />;
}

export default Background;
