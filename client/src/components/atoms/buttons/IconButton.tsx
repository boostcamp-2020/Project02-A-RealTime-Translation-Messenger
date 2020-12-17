import React from 'react';
import styled from 'styled-components';
import EditIcon from '@material-ui/icons/Edit';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SendIcon from '@material-ui/icons/Send';
import MicIcon from '@material-ui/icons/Mic';
import LeaveIcon from '@material-ui/icons/ExitToApp';
import CloseIcon from '@material-ui/icons/Close';
import { IconType } from '../../../@types/types';
import Palette from '../../../@types/Palette';

export type IconButtonPropsType = {
  iconType: IconType;
  color: string;
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  className?: string;
};

const IconWrapper = styled.div`
  width: 24px;
  cursor: pointer;
`;

function IconButton({ iconType = IconType.EDIT, color = Palette.BLACK, onClick, className }: IconButtonPropsType) {
  let icon;
  const defaultIconProps = { fontSize: 24, color: color };

  switch (iconType) {
    case IconType.EDIT:
      icon = <EditIcon style={defaultIconProps} />;
      break;
    case IconType.SEND:
      icon = <SendIcon style={defaultIconProps} />;
      break;
    case IconType.MIC:
      icon = <MicIcon style={defaultIconProps} />;
      break;
    case IconType.LEAVE:
      icon = <LeaveIcon style={{ ...defaultIconProps, transform: 'rotate(180deg)' }} />;
      break;
    case IconType.CLOSE:
      icon = <CloseIcon style={defaultIconProps} />;
      break;
    case IconType.ARROW_BACK:
      icon = <ArrowBackIcon style={defaultIconProps} />;
      break;
    default:
      icon = <EditIcon style={defaultIconProps} />;
      break;
  }

  return (
    <IconWrapper onClick={onClick} className={className}>
      {icon}
    </IconWrapper>
  );
}

export default IconButton;
