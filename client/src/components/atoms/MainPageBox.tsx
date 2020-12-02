import React from 'react';
import styled from 'styled-components';

const StyledMainpageBox = styled.div`
  width: 400px;
  height: 720px;
  margin: 4px 0 0 67px;
  object-fit: contain;
  border-radius: 30px;
  box-shadow: 5px 5px 100px 0 rgba(0, 0, 0, 0.25);
  background-color: rgba(255, 255, 255, 0.6);
`;

export function MainPageBox() {
  return <StyledMainpageBox />;
}

export default MainPageBox;
