import React from 'react';
import styled from 'styled-components';

const Logo = styled.img`
  display: block;
  width: 115px;
  height: 144px;
`;

export function CryingPapago() {
  return <Logo src="https://kr.object.ncloudstorage.com/pupago/assets/CryingPapago.png" alt="crying papago" />;
}

export default CryingPapago;
