import React from 'react';
import styled from 'styled-components';
import Palette from '../../../@types/Palette';

import palette from '../../../@types/Palette';

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
  font-size: 14px;
  cursor: pointer;
  user-select: none;
`;

const StyledSideBarTab = styled.span<SideBarTabStyleProps>`
  display: block;
  padding: 0 0 2px 0;
  border-bottom: 2px solid ${(props) => (props.isSelected ? Palette.PUPAGO_BLUE : 'transparent')};
`;

export type SideBarTabPropsType = {
  children: React.ReactNode;
  isSelected: boolean;
  isTabNameParticipant: boolean;
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

function SideBarTab({ children, isSelected, isTabNameParticipant, onClick }: SideBarTabPropsType) {
  return (
    <StyledSideBarTabWrapper isSelected={isSelected} isTabNameParticipant={isTabNameParticipant} onClick={onClick}>
      <StyledSideBarTab isSelected={isSelected}>{children}</StyledSideBarTab>
    </StyledSideBarTabWrapper>
  );
}

export default SideBarTab;
