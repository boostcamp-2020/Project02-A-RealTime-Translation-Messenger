import React from 'react';

import useRoom from '../../../hooks/useRoom';
import MainButton from '../../atoms/buttons/MainButton';

const roomTitleValidate = (title: string) => {
  if (title.length < 2 || title.length > 30) return false;
  if (title.trim().length === 0) return false;
  return true;
};

function RoomCreationButton() {
  const { data: roomData, onCreateRoom } = useRoom();

  return (
    <MainButton
      disabled={!roomTitleValidate(roomData.title)}
      onClickButton={() => {
        onCreateRoom({ title: roomData.title, isPrivate: roomData.isPrivate });
        //승인 떨어지면 채팅방 입장
      }}
    >
      생성하기
    </MainButton>
  );
}

export default RoomCreationButton;
