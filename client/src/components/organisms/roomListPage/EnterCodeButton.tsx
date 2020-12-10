import React from 'react';
import MainButton from '../../atoms/buttons/MainButton';

function EnterCodeButton() {
  return (
    <div>
      <MainButton
        disabled={false}
        onClickButton={() => {
          // 코드 입력 페이지로 이동
        }}
      >
        코드로 참가하기
      </MainButton>
    </div>
  );
}

export default EnterCodeButton;
