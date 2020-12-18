import React from 'react';
import styled from 'styled-components';

export type RoomItemBoxTypes = {
  size: 'big' | 'small';
  children: React.ReactNode;
  onClickButton: () => void;
  disabled: boolean;
};

type StyledRoomItemBoxPropsType = {
  size: 'big' | 'small';
  disabled: boolean;
};

const setButtonColor = (disabled: boolean | undefined) => {
  switch (disabled) {
    case true:
      return 'rgba(255, 255, 255, 0.5)';
    case false:
      return 'white';
    default:
      return 'white';
  }
};

const StyledRoomItemBox = styled.div<StyledRoomItemBoxPropsType>`
  width: ${(props) => (props.size === 'big' ? '344px' : '232px')};
  height: ${(props) => (props.size === 'big' ? '80px' : '64px')};
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.25);
  margin-bottom: 26px;
  padding: ${(props) => (props.size === 'big' ? '12px 12px 0 12px' : '8px 8px 0 8px')};
  border-radius: 10px;
  background-color: ${(props) => setButtonColor(props.disabled)};
  ${(props) => (props.disabled ? '' : 'cursor: pointer;')}
`;

function RoomItemBox({ size = 'big', children, onClickButton, disabled }: RoomItemBoxTypes) {
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
