import React from 'react';
import styled from 'styled-components';
import RefreshIcon from '@material-ui/icons/Refresh';

import Palette from '../../@types/Palette';

const StyledProfileChangeButton = styled.button`
  width: 32px;
  height: 32px;
  padding: 1px;
  border-radius: 10px;
  border: solid 3px #ffffff;
  background-color: #5ca7e4;
`;

const StyledRefreshIcon = styled(RefreshIcon)`
  width: 16px;
  height: 16px;
  color: white;
`;

export function ProfileChangeButton() {
  return (
    <StyledProfileChangeButton>
      <StyledRefreshIcon />
    </StyledProfileChangeButton>
  );
}

export default ProfileChangeButton;
