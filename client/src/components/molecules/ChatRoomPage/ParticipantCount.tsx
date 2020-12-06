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
  width: 48px;
  height: 16px;
`;

export const ParticipantCount = ({ maxCapacity, participatingCount }: ParticipantCountPropsType) => {
  return (
    <ParticipantCountWrapper>
      <MiniLogo />
      <Text size={14} color={Palette.PUPAGO_BLUE}>
        {participatingCount} / {maxCapacity}
      </Text>
    </ParticipantCountWrapper>
  );
};

export default ParticipantCount;
