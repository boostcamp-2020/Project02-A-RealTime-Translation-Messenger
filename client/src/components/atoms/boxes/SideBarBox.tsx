import React from 'react';
import styled from 'styled-components';

export type SideBarBoxpropsType = {
  children: React.ReactNode;
};

const StyledSideBar = styled.section`
  width: 280px;
  height: 720px;
  box-shadow: 5px 5px 100px rgba(0, 0, 0, 0.25);
  border-radius: 0px 30px 30px 0px;
  background: rgba(255, 255, 255, 0.6);
`;

function SideBarBox({ children }: SideBarpropsType) {
  return (
    <>
      <StyledSideBar>{children}</StyledSideBar>
    </>
  );
}

export default SideBarBox;
