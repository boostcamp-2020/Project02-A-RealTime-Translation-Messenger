import React from 'react';
import styled from 'styled-components';

import Images from '../../../assets/images';

export type HomeLogoType = {
  onClick?: (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => void;
};

const StyledLogo = styled.img`
  display: block;
  width: 161px;
  height: 40px;
  cursor: pointer;
`;

export function HomeLogo({ onClick }: HomeLogoType) {
  return <StyledLogo onClick={onClick} src={Images.HOME_LOGO} alt="pupago home logo" />;
}

export default HomeLogo;
