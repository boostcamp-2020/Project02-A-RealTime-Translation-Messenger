import React, { useEffect } from 'react';
import { useIntl } from 'react-intl';

import CharacterLimit from '../../../@types/characterLimit';
import useRoom from '../../../hooks/useRoom';
import validation from '../../../utils/validation';
import MainButton from '../../atoms/buttons/MainButton';

function RoomCreationButton() {
  const { data: roomData, onCreateRoom } = useRoom();
  const { formatMessage } = useIntl();

  return (
    <MainButton
      disabled={!validation.isValidRoomTitle(roomData.title)}
      onClickButton={() => {
        onCreateRoom({ title: roomData.title, isPrivate: roomData.isPrivate });
      }}
    >
      {formatMessage({ id: 'create' })}
    </MainButton>
  );
}

export default RoomCreationButton;
