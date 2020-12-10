import React from 'react';
import MainPageNavigation from '../../../@types/mainPageNavigation';
import useNavigation from '../../../hooks/useNavigation';
import MainButton from '../../atoms/buttons/MainButton';

function EnterCodeButton() {
  const { onSetNavigation } = useNavigation();
  return (
    <div>
      <MainButton
        disabled={false}
        onClickButton={() => {
          onSetNavigation(MainPageNavigation.CODE_INPUT);
        }}
      >
        코드로 참가하기
      </MainButton>
    </div>
  );
}

export default EnterCodeButton;
