import React from 'react';
import styled from 'styled-components';

import Palette from '../../@types/Palette';

export type RoomCodeTextPropsType = {
  code: string;
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

const StyledRoomCode = styled.div`
  width: 72px;
  height: 24px;
  outline: none;
  border-radius: 10px;
  border: solid 1px ${Palette.DARK_GREY};
  background-color: rgba(196, 196, 196, 0);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  user-select: none;
`;

const StyledRoomCodeText = styled.p`
  font-size: 14px;
  letter-spacing: 1.4px;
  color: ${Palette.DARK_GREY};
  margin: 0;
  margin-bottom: 2px;
`;

export function RoomCode({ code, onClick }: RoomCodeTextPropsType) {
  return (
    <StyledRoomCode onClick={onClick}>
      <StyledRoomCodeText>{code}</StyledRoomCodeText>
    </StyledRoomCode>
  );
}

export default RoomCode;
