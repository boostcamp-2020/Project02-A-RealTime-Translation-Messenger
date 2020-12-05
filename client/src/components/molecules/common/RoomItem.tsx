import React from 'react';
import styled from 'styled-components';

import RoomItemBox from '../../atoms/boxes/RoomItemBox';
import MiniLogo from '../../atoms/logos/MiniLogo';
import Text from '../../atoms/texts/Text';
import Palette from '../../../@types/Palette';

const RoomItemHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 0 15px 0;
  padding: 0 0 2px 0;
  border-bottom: 4px solid ${Palette.LIGHT_GREY};
`;

const RoomItemHeaderLeft = styled.div`
  display: flex;
  align-items: center;
`;

const MarginedText = styled(Text)`
  margin-left: 5px;
`;

export type RoomItemPropsType = {
  size: 'big' | 'small';
  createdAt: string;
  participantCount: number;
  roomCapacity: number;
  title: string;
};

function RoomItem({ size, createdAt, participantCount, roomCapacity, title }: RoomItemPropsType) {
  return (
    <div>
      <RoomItemBox size={size}>
        <RoomItemHeaderWrapper>
          <RoomItemHeaderLeft>
            <MiniLogo />
            <MarginedText size={14} color={Palette.PUPAGO_BLUE}>
              {createdAt}
            </MarginedText>
          </RoomItemHeaderLeft>
          <Text size={14} color={Palette.DARK_GREY}>{`(${participantCount} / ${roomCapacity})`}</Text>
        </RoomItemHeaderWrapper>

        <Text size={16} color={Palette.DARK_GREY}>
          {title}
        </Text>
      </RoomItemBox>
    </div>
  );
}

export default RoomItem;
