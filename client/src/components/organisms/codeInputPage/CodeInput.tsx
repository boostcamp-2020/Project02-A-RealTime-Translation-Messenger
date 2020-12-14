import React, { useState, useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import useRoom from '../../../hooks/useRoom';
import CodeInputMolecule from '../../molecules/codeInputPage/CodeInput';

const Wrapper = styled.div`
  display: flex;
  margin-top: 198px;
`;

const isRoomCodeValid = (roomCode: string) => {
  if (roomCode.length === 0) return true;
  return /^[A-Za-z0-9]*$/.test(roomCode);
};

function CodeInput() {
  const { data: room, error: roomError, onJoinRoom, onChangeRoomCode } = useRoom();
  const history = useHistory();
  const [roomCodeStatus, setRoomCodeStatus] = useState({ code: room.roomCode, valid: true });
  const { code, valid } = roomCodeStatus;

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      const cuttedValue = value.substr(0, 4).toUpperCase();

      if (!isRoomCodeValid(value)) {
        setRoomCodeStatus({ code, valid: false });
        return;
      }
      setRoomCodeStatus({ code: cuttedValue, valid: true });
    },
    [roomCodeStatus],
  );

  const onKeyUp = useCallback(() => {
    if (code.length === 4 && isRoomCodeValid(code)) {
      onChangeRoomCode(code);
      onJoinRoom({ roomCode: code, isPrivate: 'true' });
    }
  }, [roomCodeStatus]);

  useEffect(() => {
    if (roomError !== null) {
      alert('잘못된 방 번호 입니다.');
      setRoomCodeStatus({ code: '', valid: true });
    }
  }, [roomError]);

  useEffect(() => {
    if (room.title.length > 0) {
      history.push('/chat');
    }
  }, [room]);

  return (
    <Wrapper>
      <CodeInputMolecule roomCodeStatus={{ code, valid }} onChange={onChange} onKeyUp={onKeyUp} />
    </Wrapper>
  );
}

export default CodeInput;
