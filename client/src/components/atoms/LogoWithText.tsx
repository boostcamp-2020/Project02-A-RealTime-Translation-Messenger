import React from 'react';
import styled from 'styled-components';

const Logo = styled.img`
  display: block;
  width: 53px;
  height: 72px;
`;

export function LogoWithText() {
  return <Logo src="https://i.imgur.com/Lcng1gJ.png" alt="pupago logo with text" />;
}

export default LogoWithText;
