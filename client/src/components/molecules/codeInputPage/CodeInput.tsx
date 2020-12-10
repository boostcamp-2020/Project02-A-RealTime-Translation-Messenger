import React, { useState, useRef } from 'react';
import styled from 'styled-components';

import CodeBox from '../../atoms/boxes/CodeBox';
import Text from '../../atoms/texts/Text';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
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
  width: 100%;
`;

const FakeInput = styled.input`
  width: 0px;
  height: 0px;
  padding: 0;
  outline: none;
  border: none;
`;

export type CodeInputPropsType = {
  roomCodeStatus: { code: string; valid: boolean };
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyUp?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
};

function CodeInput({ roomCodeStatus, onChange, onKeyUp }: CodeInputPropsType) {
  const { code, valid } = roomCodeStatus;
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <Wrapper>
      <InputCodeText size={14}>코드를 입력해주세요</InputCodeText>
      <WarningText size={14} color={'red'} isValidText={valid}>
        코드는 숫자와 영어만 허용됩니다.
      </WarningText>
      <FakeInput
        type="text"
        value={code}
        onChange={onChange}
        onKeyUp={onKeyUp}
        autoFocus={true}
        onBlur={() => {
          inputRef.current?.focus();
        }}
        ref={inputRef}
      />
      <Codes>
        <CodeBox isEntered={code[0] ? true : false}>{code[0]}</CodeBox>
        <CodeBox isEntered={code[1] ? true : false}>{code[1]}</CodeBox>
        <CodeBox isEntered={code[2] ? true : false}>{code[2]}</CodeBox>
        <CodeBox isEntered={code[3] ? true : false}>{code[3]}</CodeBox>
      </Codes>
    </Wrapper>
  );
}

export default CodeInput;
