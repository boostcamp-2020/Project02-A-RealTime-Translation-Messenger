import React from 'react';
import styled from 'styled-components';

const Logo = styled.img`
  display: block;
  width: 161px;
  height: 40px;
`;

export function HomeLogo() {
  return <Logo src="https://i.imgur.com/XY7hp0F.png" alt="pupago home logo" />;
}

export default HomeLogo;
