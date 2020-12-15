import React from 'react';
import styled from 'styled-components';

import Images from '../../../assets/images';

const StyledLogo = styled.img`
  display: block;
  width: 16px;
  height: 16px;
`;

export function MiniLogo() {
  return <StyledLogo src={Images.MINI_LOGO} alt="pupago mini logo" />;
}

export default MiniLogo;
