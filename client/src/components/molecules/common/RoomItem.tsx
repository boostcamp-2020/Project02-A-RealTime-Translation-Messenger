import React from 'react';
import styled from 'styled-components';

import RoomItemBox from '../../atoms/boxes/RoomItemBox';
import MiniLogo from '../../atoms/logos/MiniLogo';
import Text from '../../atoms/texts/Text';
import Palette from '../../../@types/Palette';

type RoomItemHeaderWrapperPropsType = {
  size: 'big' | 'small';
};

const RoomItemHeaderWrapper = styled.div<RoomItemHeaderWrapperPropsType>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* margin-bottom: ${(props) => (props.size === 'big' ? '16px' : '12px')}; */
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

const TextWrapper = styled.div<RoomItemHeaderWrapperPropsType>`
  display: flex;
  align-items: center;
  width: ${(props) => (props.size === 'big' ? '320px' : '216px')};
  height: ${(props) => (props.size === 'big' ? '46px' : '34px')};
`;

function RoomItem({ size, createdAt, participantCount, roomCapacity, title }: RoomItemPropsType) {
  return (
    <div>
      <RoomItemBox size={size}>
        <RoomItemHeaderWrapper size={size}>
          <RoomItemHeaderLeft>
            <MiniLogo />
            <MarginedText size={size === 'big' ? 14 : 12} color={Palette.PUPAGO_BLUE}>
              {createdAt}
            </MarginedText>
          </RoomItemHeaderLeft>
          <Text
            size={size === 'big' ? 14 : 12}
            color={Palette.DARK_GREY}
          >{`(${participantCount} / ${roomCapacity})`}</Text>
        </RoomItemHeaderWrapper>
        <TextWrapper size={size}>
          <Text size={size === 'big' ? 16 : 12} color={Palette.DARK_GREY}>
            {title}
          </Text>
        </TextWrapper>
      </RoomItemBox>
    </div>
  );
}

export default RoomItem;
