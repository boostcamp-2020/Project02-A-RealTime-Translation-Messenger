import React, { useState, useCallback, useEffect } from 'react';
import { useIntl } from 'react-intl';
import styled from 'styled-components';

import CharacterLimit from '../../../@types/characterLimit';
import useReset from '../../../hooks/useReset';
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
  const [roomCodeStatus, setRoomCodeStatus] = useState({ code: room.roomCode, valid: true });
  const { code, valid } = roomCodeStatus;
  const { onReset } = useReset();
  const { formatMessage } = useIntl();

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      const cuttedValue = value.substr(0, CharacterLimit.CODE_INPUT).toUpperCase();

      if (!isRoomCodeValid(value)) {
        setRoomCodeStatus({ code, valid: false });
        return;
      }
      setRoomCodeStatus({ code: cuttedValue, valid: true });
    },
    [roomCodeStatus],
  );

  const onKeyUp = useCallback(() => {
    if (code.length === CharacterLimit.CODE_INPUT && isRoomCodeValid(code)) {
      onChangeRoomCode(code);
      onJoinRoom({ roomCode: code, isPrivate: true });
      setRoomCodeStatus({ code: '', valid: true });
    }
  }, [roomCodeStatus]);

  useEffect(() => {
    setRoomCodeStatus({ code: '', valid: true });
  }, []);

  useEffect(() => {
    if (roomError !== null) {
      alert(formatMessage({ id: 'wrongRoomCode' }));
      setRoomCodeStatus({ code: '', valid: true });
      onReset();
    }
  }, [roomError]);

  return (
    <Wrapper>
      <CodeInputMolecule roomCodeStatus={{ code, valid }} onChange={onChange} onKeyUp={onKeyUp} />
    </Wrapper>
  );
}

export default CodeInput;
