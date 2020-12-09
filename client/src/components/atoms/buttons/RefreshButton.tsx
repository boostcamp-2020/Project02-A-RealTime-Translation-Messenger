import React from 'react';
import styled from 'styled-components';
import RefreshIcon from '@material-ui/icons/Refresh';

import Palette from '../../../@types/Palette';

export type RefreshButtonTypes = {
  onClickRefresh: () => void;
};

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 344px;
  height: 32px;
  cursor: pointer;
`;

const RefrshButtonWrapper = styled.div`
  width: 344px;
  height: 32px;
  margin: 32px 0 16px 0;
  border-radius: 5px;
  background-color: ${Palette.PUPAGO_BLUE};

  &:hover {
    background-color: ${Palette.DARK_PUPAGO_BLUE};
  }
`;

export function RefreshButton({ onClickRefresh }: RefreshButtonTypes) {
  return (
    <RefrshButtonWrapper onClick={onClickRefresh}>
      <IconWrapper>
        <RefreshIcon style={{ fontSize: 24, color: 'white' }} />
      </IconWrapper>
    </RefrshButtonWrapper>
  );
}

export default RefreshButton;
