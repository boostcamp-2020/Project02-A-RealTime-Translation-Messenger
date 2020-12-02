import React from 'react';
import styled from 'styled-components';

export type MainPageBoxPropsType = {
  children: React.ReactNode;
};

const StyledMainpageBox = styled.div<MainPageBoxPropsType>`
  width: 400px;
  height: 720px;
  border-radius: 30px;
  box-shadow: 5px 5px 100px 0 rgba(0, 0, 0, 0.25);
  background-color: rgba(255, 255, 255, 0.6);
`;

export function MainPageBox({ children }: MainPageBoxPropsType) {
  return <StyledMainpageBox>{children}</StyledMainpageBox>;
}

export default MainPageBox;
