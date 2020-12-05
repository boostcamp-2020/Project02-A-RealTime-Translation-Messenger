import React from 'react';
import styled from 'styled-components';

import Text from '../../atoms/texts/Text';
import LanguageSelectButton from '../../atoms/buttons/LanguageSelectButton';
import Palette from '../../../@types/Palette';

const LanguageSelectionBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 169px;
  height: 96px;
  box-sizing: border-box;
`;

const LanguageButtonBox = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-top: 8px;
`;

export type LanguageSelectionPropsType = {
  children: React.ReactNode;
  selectedKorean: boolean;
  selectedEnglish: boolean;
};

function LanguageSelection({ children, selectedKorean, selectedEnglish }: LanguageSelectionPropsType) {
  return (
    <LanguageSelectionBox>
      <Text size={18} color={Palette.DARK_GREY}>
        {children}
      </Text>
      <LanguageButtonBox>
        <LanguageSelectButton selected={selectedKorean} language={'Korean'}></LanguageSelectButton>
        <LanguageSelectButton selected={selectedEnglish} language={'English'}></LanguageSelectButton>
      </LanguageButtonBox>
    </LanguageSelectionBox>
  );
}

export default LanguageSelection;
