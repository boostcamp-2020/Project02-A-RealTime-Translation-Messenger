import React from 'react';

import LanguageSelectionMolecule from '../../molecules/userInfoPage/LanguageSelection';
import useUser from '../../../hooks/useUser';

function LanguageSelection() {
  const { languageData, onSetLanguage } = useUser();
  return (
    <LanguageSelectionMolecule
      selectedKorean={languageData === 'Korean' ? true : false}
      onClickLanguage={onSetLanguage}
    />
  );
}

export default LanguageSelection;
