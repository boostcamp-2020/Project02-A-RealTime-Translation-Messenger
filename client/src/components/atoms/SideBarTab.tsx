import React from 'react';
import styled from 'styled-components';
import Palette from '../../@types/Palette';

import palette from '../../@types/Palette';

type SideBarTabStyleProps = {
  isSelected: boolean;
  isTabNameParticipant?: boolean;
};

const StyledSideBarTabWrapper = styled.div<SideBarTabStyleProps>`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 140px;
  height: 72px;

  border-radius: ${(props) => (props.isTabNameParticipant ? '0 0 30px 0' : '0 30px 0 30px')};

  background-color: ${(props) => (props.isSelected ? 'transparent' : 'rgba(92, 167, 228, 0.8)')};
  color: ${(props) => (props.isSelected ? palette.PUPAGO_BLUE : 'white')};

  box-sizing: border-box;

  font-size: 14px;
`;

const StyledSideBarTab = styled.span<SideBarTabStyleProps>`
  display: block;

  padding-bottom: 2px;
  box-sizing: border-box;

  border-bottom: 2px solid ${(props) => (props.isSelected ? Palette.PUPAGO_BLUE : 'transparent')};
`;

export type SideBarTabPropsType = {
  children: React.ReactNode;
  isSelected: boolean;
  isTabNameParticipant: boolean;
};

function SideBarTab({ children, isSelected, isTabNameParticipant }: SideBarTabPropsType) {
  return (
    <StyledSideBarTabWrapper isSelected={isSelected} isTabNameParticipant={isTabNameParticipant}>
      <StyledSideBarTab isSelected={isSelected}>{children}</StyledSideBarTab>
    </StyledSideBarTabWrapper>
  );
}

export default SideBarTab;
