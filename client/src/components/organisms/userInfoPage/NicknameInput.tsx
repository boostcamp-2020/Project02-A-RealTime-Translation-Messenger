import React, { useState } from 'react';
import styled from 'styled-components';

import Palette from '../../../@types/Palette';
import useUser from '../../../hooks/useUser';
import UnderLinedInput from '../../atoms/inputs/UnderLinedInput';
import Text from '../../atoms/texts/Text';
import CharacterLimit from '../../../@types/characterLimit';

const NicknameInputWrapper = styled.div`
  position: relative;
`;

const InputInfoWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

const NickNameErrorMessage = styled(Text)`
  position: absolute;
  bottom: 40px;
  width: 344px;
  word-break: keep-all;
`;

const NicknameLength = styled(Text)`
  position: absolute;
  display: flex;
  justify-content: flex-end;
  right: -8px;
  width: 40px;
`;

function NicknameInput() {
  const { nicknameData, onSetNickname } = useUser();
  const [isNicknameValid, setIsNicknameValid] = useState(true);
  return (
    <NicknameInputWrapper>
      {!isNicknameValid && (
        <NickNameErrorMessage size={12} color={Palette.DARK_GREY}>
          닉네임은 2자 이상 12자 이하, 특수문자를 제외하고 작성해주세요.
        </NickNameErrorMessage>
      )}
      <UnderLinedInput
        placeholder="닉네임을 입력해주세요"
        value={nicknameData}
        onChange={(e) => {
          if (!/^[A-Z|a-z|가-힣]{2,12}$/.test(e.target.value)) {
            setIsNicknameValid(false);
          } else {
            setIsNicknameValid(true);
          }
          onSetNickname(e.target.value.substr(0, CharacterLimit.NICKNAME));
        }}
        maxLength={CharacterLimit.NICKNAME}
        valid={isNicknameValid}
      />
      <InputInfoWrapper>
        <NicknameLength
          size={14}
          color={Palette.PUPAGO_BLUE}
        >{`${nicknameData.length} / ${CharacterLimit.NICKNAME}`}</NicknameLength>
      </InputInfoWrapper>
    </NicknameInputWrapper>
  );
}

export default NicknameInput;
