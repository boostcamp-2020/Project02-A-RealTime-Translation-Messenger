import React from 'react';
import styled from 'styled-components';

const Logo = styled.img`
  display: block;
  width: 16px;
  height: 16px;
`;

export function MiniLogo() {
  return <Logo src="https://i.imgur.com/8ETABGj.png" alt="pupago mini logo" />;
}

export default MiniLogo;
