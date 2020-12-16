import React from 'react';
import styled from 'styled-components';

import MiniLogo from '../../atoms/logos/MiniLogo';
import Text from '../../atoms/texts/Text';
import Palette from '../../../@types/Palette';

export type ParticipantCountPropsType = {
  maxCapacity: number;
  participatingCount: number;
};

const ParticipantCountWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 48px;
  height: 16px;
`;

const MarginedText = styled(Text)`
  margin-top: 2px;
`;

export const ParticipantCount = ({ maxCapacity, participatingCount }: ParticipantCountPropsType) => {
  return (
    <ParticipantCountWrapper>
      <MiniLogo />
      <MarginedText size={14} color={Palette.PUPAGO_BLUE}>
        {participatingCount} / {maxCapacity}
      </MarginedText>
    </ParticipantCountWrapper>
  );
};

export default ParticipantCount;
