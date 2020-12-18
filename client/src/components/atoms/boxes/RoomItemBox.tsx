import React from 'react';
import styled from 'styled-components';

import Palette from '../../../@types/Palette';
import { Size } from '../../../@types/types';

export type RoomItemBoxTypes = {
  size: Size;
  children: React.ReactNode;
  onClickButton: () => void;
  disabled: boolean;
};

type StyledRoomItemBoxPropsType = {
  size: Size;
  disabled: boolean;
};

const setButtonColor = (disabled: boolean | undefined) => {
  switch (disabled) {
    case true:
      return 'rgba(255, 255, 255, 0.5)';
    case false:
      return Palette.WHITE;
    default:
      return Palette.WHITE;
  }
};

const StyledRoomItemBox = styled.div<StyledRoomItemBoxPropsType>`
  width: ${(props) => (props.size === Size.BIG ? '344px' : '232px')};
  height: ${(props) => (props.size === Size.BIG ? '80px' : '64px')};
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.25);
  margin-bottom: 26px;
  padding: ${(props) => (props.size === Size.BIG ? '12px 12px 0 12px' : '8px 8px 0 8px')};
  border-radius: 10px;
  background-color: ${(props) => setButtonColor(props.disabled)};
  ${(props) => (props.disabled ? '' : 'cursor: pointer;')}
`;

function RoomItemBox({ size = Size.BIG, children, onClickButton, disabled }: RoomItemBoxTypes) {
  return (
    <StyledRoomItemBox
      size={size}
      disabled={disabled}
      onClick={() => {
        if (!disabled) {
          onClickButton();
        }
      }}
    >
      {children}
    </StyledRoomItemBox>
  );
}

export default RoomItemBox;
