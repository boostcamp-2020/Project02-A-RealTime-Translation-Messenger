import React, { useState, useRef } from 'react';
import styled from 'styled-components';

import CodeBox from '../../atoms/boxes/CodeBox';
import Text from '../../atoms/texts/Text';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InputCodeText = styled(Text)`
  margin-bottom: 18px;
`;

type WarningTextProps = {
  isValidText: boolean;
};

const WarningText = styled(Text)<WarningTextProps>`
  margin-bottom: 10px;
  visibility: ${(props) => (props.isValidText ? 'hidden' : 'visible')};
`;

const Codes = styled.div`
  display: flex;
  justify-content: space-between;
  width: 368px;
`;

const FakeInput = styled.input`
  width: 0px;
  height: 0px;
  padding: 0;
  outline: none;
  border: none;
`;

export type CodeInputPropsType = {
  roomCode: { value: string; valid: boolean };
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyUp?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
};

function CodeInput({ roomCode, onChange, onKeyUp }: CodeInputPropsType) {
  // // ------ codeInput 코드 예시, 나중에 Organism에서 사용하거나, Redux에서 사용하면 됩니다.

  const isRoomCodeValid = (roomCode: string) => {
    if (!/^[A-Z|0-9]{4}$/.test(roomCode)) return false;
    return true;
  };

  // const [roomCode, setCode] = useState({ value: '', valid: true });
  const { value, valid } = roomCode;
  const inputRef = useRef<HTMLInputElement>(null);

  // const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { value } = e.target;
  //   const cuttedValue = value.substr(0, 4).toUpperCase();
  //   if (/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|\s]/.test(value)) {
  //     setCode({ ...roomCode, valid: false });
  //     return;
  //   }
  //   setCode({ value: cuttedValue, valid: true });
  // };

  // const onKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
  //   if (roomCode.value.length === 4) {
  //     if (isRoomCodeValid(value)) {
  //       alert('4자리가 입력되었습니다.');
  //       setCode({ value: '', valid: true });
  //       return;
  //     }
  //   }
  // };

  return (
    <Wrapper>
      <InputCodeText size={14}>코드를 입력해주세요</InputCodeText>
      <WarningText size={14} color={'red'} isValidText={valid}>
        코드는 숫자와 영어만 허용됩니다.
      </WarningText>
      <FakeInput
        type="text"
        value={value}
        onChange={onChange}
        onKeyUp={onKeyUp}
        autoFocus={true}
        onBlur={() => {
          inputRef.current?.focus();
        }}
        ref={inputRef}
      />
      <Codes>
        <CodeBox isEntered={value[0] ? true : false}>{value[0]}</CodeBox>
        <CodeBox isEntered={value[1] ? true : false}>{value[1]}</CodeBox>
        <CodeBox isEntered={value[2] ? true : false}>{value[2]}</CodeBox>
        <CodeBox isEntered={value[3] ? true : false}>{value[3]}</CodeBox>
      </Codes>
    </Wrapper>
  );
}

export default CodeInput;
