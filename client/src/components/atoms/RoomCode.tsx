import React from 'react';
import styled from 'styled-components';

import Palette from '../../@types/Palette';

export type RoomCodePropsType = {
  children: React.ReactNode;
};

export type RoomCodeTextPropsType = {
  children: React.ReactNode;
};

const StyledRoomCode = styled.div<RoomCodePropsType>`
  width: 72px;
  height: 24px;
  padding: 4px 0px 0px 8px;
  border-radius: 10px;
  border: solid 1px ${Palette.DARK_GREY};
  background-color: rgba(196, 196, 196, 0);
`;

const StyledRoomCodeText = styled.div<RoomCodeTextPropsType>`
  width: 64px;
  height: 20px;
  font-family: NotoSansKR;
  font-size: 14px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: 1.4px;
  text-align: center;
  color: #808080;
`;

export function RoomCode({ children }: RoomCodeTextPropsType) {
  return (
    <StyledRoomCode>
      <StyledRoomCodeText>{children}</StyledRoomCodeText>
    </StyledRoomCode>
  );
}

export default RoomCode;
