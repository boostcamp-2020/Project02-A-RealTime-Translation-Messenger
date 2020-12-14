import React from 'react';
import styled from 'styled-components';
import RefreshIcon from '@material-ui/icons/Refresh';

const StyledProfileChangeButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  outline: none;
  border-radius: 10px;
  border: solid 3px #ffffff;
  background-color: #5ca7e4;
  cursor: pointer;
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
