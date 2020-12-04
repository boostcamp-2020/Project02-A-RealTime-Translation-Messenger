import React from 'react';
import styled from 'styled-components';
import RefreshIcon from '@material-ui/icons/Refresh';

import Palette from '../../../@types/Palette';

export type RefreshButtonTypes = {
  onClick?: () => (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

const IconWrapper = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 344px;
  height: 32px;
  cursor: pointer;
`;

const RefrshButtonWrapper = styled.div<RefreshButtonTypes>`
  width: 344px;
  height: 32px;

  background-color: ${Palette.PUPAGO_BLUE};
  border-radius: 5px;

  &:hover {
    background-color: ${Palette.DARK_PUPAGO_BLUE};
  }
`;

export function RefreshButton({ ...props }: RefreshButtonTypes) {
  return (
    <RefrshButtonWrapper {...props}>
      <IconWrapper>
        <RefreshIcon style={{ fontSize: 24, color: 'white' }} />
      </IconWrapper>
    </RefrshButtonWrapper>
  );
}

export default RefreshButton;