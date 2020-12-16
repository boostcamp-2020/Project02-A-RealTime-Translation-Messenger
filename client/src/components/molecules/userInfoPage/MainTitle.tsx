import React from 'react';
import styled from 'styled-components';

import LogoWithText from '../../atoms/logos/LogoWithText';
import Text from '../../atoms/texts/Text';
import Palette from '../../../@types/Palette';
import { useIntl } from 'react-intl';

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

export const MainTitle = () => {
  const { formatMessage } = useIntl();

  return (
    <MainTitleWrapper>
      <LogoWithText />
      <MarginedText size={24} weight={'bold'} color={Palette.PUPAGO_BLUE}>
        {formatMessage({ id: 'mainTitle' })}
      </MarginedText>
      <Text size={18} color={Palette.DARK_GREY}>
        {formatMessage({ id: 'subTitle' })}
      </Text>
    </MainTitleWrapper>
  );
};

export default MainTitle;
