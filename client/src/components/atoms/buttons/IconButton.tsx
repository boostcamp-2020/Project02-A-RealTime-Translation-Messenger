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
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

const IconWrapper = styled.div`
  cursor: pointer;
`;

export function IconButton({ iconType = 'Edit', color = 'black', className, onClick }: IconButtonPropsType) {
  let icon;
  const defaultIconProps = { fontSize: 24, color: color };

  switch (iconType) {
    case 'Edit':
      icon = <EditIcon style={defaultIconProps} />;
      break;
    case 'Send':
      icon = <ArrowBackIcon style={defaultIconProps} />;
      break;
    case 'Mic':
      icon = <MicIcon style={defaultIconProps} />;
      break;
    case 'Leave':
      icon = <LeaveIcon style={{ ...defaultIconProps, transform: 'rotate(180deg)' }} />;
      break;
    case 'Close':
      icon = <CloseIcon style={defaultIconProps} />;
      break;
    default:
      icon = <EditIcon style={defaultIconProps} />;
      break;
  }

  return (
    <IconWrapper className={className} onClick={onClick}>
      {icon}
    </IconWrapper>
  );
}

export default IconButton;
