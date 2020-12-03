import React from 'react';
import styled from 'styled-components';

export type RoomItemBoxTypes = {
  size: 'big' | 'small';
};

const StyledRoomItemBox = styled.div<RoomItemBoxTypes>`
  width: ${(props) => (props.size === 'big' ? '344px' : '232px')};
  height: ${(props) => (props.size === 'big' ? '80px' : '64px')};

  background-color: white;
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
`;

export function RoomItemBox({ size = 'big' }: RoomItemBoxTypes) {
  return <StyledRoomItemBox size={size} />;
}

export default RoomItemBox;
