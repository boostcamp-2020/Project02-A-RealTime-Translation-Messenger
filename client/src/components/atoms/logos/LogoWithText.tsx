import React from 'react';
import styled from 'styled-components';

import Images from '../../../assets/images';

const StyledLogo = styled.img`
  display: block;
  width: 53px;
  height: 72px;
`;

function LogoWithText() {
  return <StyledLogo src={Images.LOGO_WITH_THEXT} alt="pupago logo with text" />;
}

export default LogoWithText;
