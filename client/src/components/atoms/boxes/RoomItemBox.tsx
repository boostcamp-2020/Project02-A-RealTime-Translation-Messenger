import React from 'react';
import styled from 'styled-components';

export type RoomItemBoxTypes = {
  size: 'big' | 'small';
  children: React.ReactNode;
  onClick: () => void;
};

const StyledRoomItemBox = styled.div<RoomItemBoxTypes>`
  width: ${(props) => (props.size === 'big' ? '344px' : '232px')};
  height: ${(props) => (props.size === 'big' ? '80px' : '64px')};
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.25);
  margin-bottom: 16px;
  padding: ${(props) => (props.size === 'big' ? '12px 12px 0 12px' : '8px 8px 0 8px')};
  border-radius: 10px;
  background-color: white;
  cursor: pointer;
`;

export function RoomItemBox({ size = 'big', children, onClick }: RoomItemBoxTypes) {
  return (
    <StyledRoomItemBox size={size} onClick={onClick}>
      {children}
    </StyledRoomItemBox>
  );
}

export default RoomItemBox;
