import React from 'react';
import styled from 'styled-components';

export type SideBarBoxpropsType = {
  children: React.ReactNode;
};

const StyledSideBar = styled.section`
  width: 280px;
  height: 720px;
  border-radius: 0px 30px 30px 0px;
  background: rgba(255, 255, 255, 0.6);
`;

function SideBarBox({ children }: SideBarBoxpropsType) {
  return (
    <>
      <StyledSideBar>{children}</StyledSideBar>
    </>
  );
}

export default SideBarBox;
