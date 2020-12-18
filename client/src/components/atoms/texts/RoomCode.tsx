import React from 'react';
import styled from 'styled-components';

import Palette from '../../../@types/Palette';

export type RoomCodeTextPropsType = {
  code: string;
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

const StyledRoomCode = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 72px;
  height: 24px;
  outline: none;
  border: solid 1px ${Palette.DARK_GREY};
  border-radius: 10px;
  background-color: rgba(196, 196, 196, 0);
  cursor: pointer;
  user-select: none;
`;

const StyledRoomCodeText = styled.p`
  margin: 0;
  margin-bottom: 2px;
  font-size: 14px;
  color: ${Palette.DARK_GREY};
  letter-spacing: 1.4px;
`;

function RoomCode({ code, onClick }: RoomCodeTextPropsType) {
  return (
    <StyledRoomCode onClick={onClick}>
      <StyledRoomCodeText>{code}</StyledRoomCodeText>
    </StyledRoomCode>
  );
}

export default RoomCode;
