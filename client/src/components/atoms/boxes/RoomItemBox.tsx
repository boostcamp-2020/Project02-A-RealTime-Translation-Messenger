import React from 'react';
import styled from 'styled-components';

export type RoomItemBoxTypes = {
  size: 'big' | 'small';
  children: React.ReactNode;
};

const StyledRoomItemBox = styled.div<RoomItemBoxTypes>`
  width: ${(props) => (props.size === 'big' ? '344px' : '232px')};
  height: ${(props) => (props.size === 'big' ? '80px' : '64px')};
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.25);
  padding: 14px 11px;
  border-radius: 10px;
  background-color: white;
`;

export function RoomItemBox({ size = 'big', children }: RoomItemBoxTypes) {
  return <StyledRoomItemBox size={size}>{children}</StyledRoomItemBox>;
}

export default RoomItemBox;
