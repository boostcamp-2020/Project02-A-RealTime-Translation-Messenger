import React from 'react';
import styled from 'styled-components';

export type HomeLogoType = {
  onClick?: (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => void;
};

const Logo = styled.img`
  display: block;
  width: 161px;
  height: 40px;
  cursor: pointer;
`;

export function HomeLogo({ onClick }: HomeLogoType) {
  return <Logo onClick={onClick} src="https://i.imgur.com/XY7hp0F.png" alt="pupago home logo" />;
}

export default HomeLogo;
