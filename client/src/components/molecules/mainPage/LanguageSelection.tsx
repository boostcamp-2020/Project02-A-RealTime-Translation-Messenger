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
  selected: boolean;
};

function LanguageSelection({ selected = true }: LanguageSelectionPropsType) {
  return (
    <LanguageSelectionBox>
      <Text size={18} color={Palette.DARK_GREY}>
        언어를 선택해주세요
      </Text>
      <LanguageButtonBox>
        <LanguageSelectButton selected={selected} language={'Korean'}></LanguageSelectButton>
        <LanguageSelectButton selected={!selected} language={'English'}></LanguageSelectButton>
      </LanguageButtonBox>
    </LanguageSelectionBox>
  );
}

export default LanguageSelection;
