import React from 'react';
import styled from 'styled-components';

import IconButton from '../../atoms/buttons/IconButton';
import Palette from '../../../@types/Palette';

type ChatModalPropsType = {
  children?: React.ReactNode;
  onClickClose?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

const StyledChatModalBox = styled.div`
  position: relative;
  width: 400px;
  height: 240px;
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  background-color: ${Palette.LIGHT_GREY};
`;

const AbsoluteIcon = styled(IconButton)`
  position: absolute;
  left: 16px;
  top: 16px;
`;

function ChatModalBox({ onClickClose, children }: ChatModalPropsType) {
  return (
    <StyledChatModalBox>
      <AbsoluteIcon onClick={onClickClose} iconType="Close" color={Palette.DARK_GREY} />
      {children}
    </StyledChatModalBox>
  );
}

export default ChatModalBox;
