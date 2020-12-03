import React from 'react';
import styled from 'styled-components';
import EditIcon from '@material-ui/icons/Edit';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SendIcon from '@material-ui/icons/Send';
import MicIcon from '@material-ui/icons/Mic';
import LeaveIcon from '@material-ui/icons/ExitToApp';
import CloseIcon from '@material-ui/icons/Close';

export type IconButtonPropsType = {
  iconType: 'Edit' | 'ArrowBack' | 'Send' | 'Mic' | 'Leave' | 'Close';
  color: string;
};

const IconWrapper = styled.div`
  cursor: pointer;
`;

export function IconButton({ iconType = 'Edit', color = 'black' }: IconButtonPropsType) {
  let icon;
  if (iconType === 'Edit') icon = <EditIcon style={{ fontSize: 24, color: color }} />;
  else if (iconType === 'ArrowBack') icon = <ArrowBackIcon style={{ fontSize: 24, color: color }} />;
  else if (iconType === 'Send') icon = <SendIcon style={{ fontSize: 24, color: color }} />;
  else if (iconType === 'Mic') icon = <MicIcon style={{ fontSize: 24, color: color }} />;
  else if (iconType === 'Leave')
    icon = <LeaveIcon style={{ fontSize: 24, color: color, transform: 'rotate(180deg)' }} />;
  else if (iconType === 'Close') icon = <CloseIcon style={{ fontSize: 24, color: color }} />;

  return <IconWrapper>{icon}</IconWrapper>;
}

export default IconButton;
