import React from 'react';

import useUser from '../../../hooks/useUser';
import NicknameInputMolecule from '../../molecules/userInfoPage/NicknameInput';

function NicknameInput() {
  const { nicknameData, onSetNickname } = useUser();

  return <NicknameInputMolecule nicknameData={nicknameData} onChangeNickname={onSetNickname} />;
}

export default NicknameInput;
