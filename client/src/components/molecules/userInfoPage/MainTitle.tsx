import React from 'react';
import styled from 'styled-components';

import LogoWithText from '../../atoms/logos/LogoWithText';
import Text from '../../atoms/texts/Text';
import Palette from '../../../@types/Palette';
import { useIntl } from 'react-intl';
import { TextSize } from '../../../@types/types';

const MainTitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  img {
    margin-bottom: 16px;
  }
`;

const MarginedText = styled(Text)`
  margin-bottom: 8px;
`;

function MainTitle() {
  const { formatMessage } = useIntl();

  return (
    <MainTitleWrapper>
      <LogoWithText />
      <MarginedText size={TextSize.MEGA} weight={'bold'} color={Palette.PUPAGO_BLUE}>
        {formatMessage({ id: 'mainTitle' })}
      </MarginedText>
      <Text size={TextSize.BIG} color={Palette.DARK_GREY}>
        {formatMessage({ id: 'subTitle' })}
      </Text>
    </MainTitleWrapper>
  );
}

export default MainTitle;
