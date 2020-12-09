import React from 'react';
import Palette from '../../../@types/Palette';

import useUser from '../../../hooks/useUser';
import UnderLinedInput from '../../atoms/inputs/UnderLinedInput';
import Text from '../../atoms/texts/Text';

function NicknameInput() {
  const { nicknameData, onSetNickname } = useUser();
  return (
    <>
      <UnderLinedInput
        placeholder="닉네임을 입력해주세요"
        value={nicknameData}
        onChange={(e) => {
          if (nicknameData.length < 12) {
            onSetNickname(e.target.value);
          }
        }}
        maxLength={12}
      />
      <Text color={Palette.PUPAGO_BLUE} size={14}>{`${nicknameData.length} / ${12}`}</Text>
    </>
  );
}

export default NicknameInput;
