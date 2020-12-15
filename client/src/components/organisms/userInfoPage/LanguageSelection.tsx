import React from 'react';

import LanguageSelectionMolecule from '../../molecules/userInfoPage/LanguageSelection';
import useUser from '../../../hooks/useUser';
import LangCode from '../../../@types/langCode';

function LanguageSelection() {
  const { languageData, onSetLanguage } = useUser();
  return (
    <LanguageSelectionMolecule
      selectedKorean={languageData === LangCode.KOREAN ? true : false}
      onClickLanguage={onSetLanguage}
    />
  );
}

export default LanguageSelection;
