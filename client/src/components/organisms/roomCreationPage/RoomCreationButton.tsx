import React, { useEffect } from 'react';
import { useIntl } from 'react-intl';

import CharacterLimit from '../../../@types/characterLimit';
import useRoom from '../../../hooks/useRoom';
import MainButton from '../../atoms/buttons/MainButton';

const roomTitleValidate = (title: string) => {
  if (title.length < CharacterLimit.ROOM_NAME_MIN || title.length > CharacterLimit.ROOM_NAME_MAX) return false;
  if (title.trim().length === 0) return false;
  return true;
};

function RoomCreationButton() {
  const { data: roomData, loading, error, onCreateRoom, onJoinRoom } = useRoom();
  const { formatMessage } = useIntl();

  return (
    <MainButton
      disabled={!roomTitleValidate(roomData.title)}
      onClickButton={() => {
        onCreateRoom({ title: roomData.title, isPrivate: roomData.isPrivate });
        //승인 떨어지면 채팅방 입장
      }}
    >
      {formatMessage({ id: 'create' })}
    </MainButton>
  );
}

export default RoomCreationButton;