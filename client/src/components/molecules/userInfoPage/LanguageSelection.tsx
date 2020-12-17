import React from 'react';
import styled from 'styled-components';
import { useIntl } from 'react-intl';

import Text from '../../atoms/texts/Text';
import LanguageSelectButton from '../../atoms/buttons/LanguageSelectButton';
import Palette from '../../../@types/Palette';
import LangCode from '../../../@types/langCode';
import { TextSize } from '../../../@types/types';

const LanguageSelectionBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 200px;
  height: 96px;
`;

const LanguageButtonBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
  width: 130px;
`;

export type LanguageSelectionPropsType = {
  selectedKorean: boolean;
  onClickLanguage: (selectLanguage: LangCode) => void;
};

function LanguageSelection({ selectedKorean = true, onClickLanguage }: LanguageSelectionPropsType) {
  const { formatMessage } = useIntl();

  return (
    <LanguageSelectionBox>
      <Text size={TextSize.BIG} color={Palette.DARK_GREY}>
        {formatMessage({ id: 'chooseYourLanguage' })}
      </Text>
      <LanguageButtonBox>
        <LanguageSelectButton
          selected={selectedKorean}
          language={LangCode.KOREAN}
          onClick={() => {
            onClickLanguage(LangCode.KOREAN);
          }}
        ></LanguageSelectButton>
        <LanguageSelectButton
          selected={!selectedKorean}
          language={LangCode.ENGLISH}
          onClick={() => {
            onClickLanguage(LangCode.ENGLISH);
          }}
        ></LanguageSelectButton>
      </LanguageButtonBox>
    </LanguageSelectionBox>
  );
}

export default LanguageSelection;
