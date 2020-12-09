import React, { useState } from 'react';
import styled from 'styled-components';

import useRoom from '../../../hooks/useRoom';
import CodeInputMolecule from '../../molecules/codeInputPage/CodeInput';

const Wrapper = styled.div`
  display: flex;
  margin-top: 198px;
`;

const isRoomCodeInputValid = (roomCode: string) => /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|\s]/.test(roomCode);

const isRoomCodeValid = (roomCode: string) => {
  if (!/^[A-Z|0-9]{4}$/.test(roomCode)) return false;
  return true;
};

function CodeInput() {
  const { data: room, onJoinRoom, onChangeRoomCode } = useRoom();
  const [roomCodeStatus, setRoomCodeStatus] = useState({ code: room.roomCode, valid: true });
  const { code, valid } = roomCodeStatus;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const cuttedValue = value.substr(0, 4).toUpperCase();

    if (isRoomCodeInputValid(value)) {
      setRoomCodeStatus({ code, valid: false });
      return;
    }
    setRoomCodeStatus({ code: cuttedValue, valid: true });
  };

  const onKeyUp = () => {
    if (code.length === 4) {
      if (isRoomCodeValid(code)) {
        onChangeRoomCode(code);
        onJoinRoom({ roomCode: code, isPrivate: 'true' });
        return;
      }
    }
  };

  return (
    <Wrapper>
      <CodeInputMolecule roomCodeStatus={{ code, valid }} onChange={onChange} onKeyUp={onKeyUp} />
    </Wrapper>
  );
}

export default CodeInput;
