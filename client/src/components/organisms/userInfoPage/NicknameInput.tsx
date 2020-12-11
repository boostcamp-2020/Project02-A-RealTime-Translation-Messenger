import React from 'react';
import styled from 'styled-components';

import Palette from '../../../@types/Palette';
import useUser from '../../../hooks/useUser';
import UnderLinedInput from '../../atoms/inputs/UnderLinedInput';
import Text from '../../atoms/texts/Text';

const NickNameLength = styled(Text)`
  display: flex;
  justify-content: flex-end;
  width: 48px;
  margin-top: 10px;
  margin-left: auto;
`;

function NicknameInput() {
  const { nicknameData, onSetNickname } = useUser();
  return (
    <>
      <UnderLinedInput
        placeholder="닉네임을 입력해주세요"
        value={nicknameData}
        onChange={(e) => {
          onSetNickname(e.target.value.substr(0, 12));
        }}
        maxLength={12}
      />
      <NickNameLength size={14} color={Palette.PUPAGO_BLUE}>{`${nicknameData.length} / ${12}`}</NickNameLength>
    </>
  );
}

export default NicknameInput;
