import React from 'react';
import styled from 'styled-components';

import Images from '../../../assets/images';

const Logo = styled.img`
  display: block;
  width: 115px;
  height: 144px;
`;

export function CryingPapago() {
  return <Logo src={Images.CRYING_PAPAGO} alt="crying papago" />;
}

export default CryingPapago;
