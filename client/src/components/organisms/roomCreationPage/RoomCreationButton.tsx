import React from 'react';
import styled from 'styled-components';

import useRoom from '../../../hooks/useRoom';
import MainButton from '../../atoms/buttons/MainButton';

const validate = (title: string) => {
  if (title.length < 2 || title.length > 30) return false;
  return true;
};

function RoomCreationButton() {
  const { data: roomData, onCreateRoom } = useRoom();

  return (
    <>
      <MainButton
        disabled={!validate(roomData.title)}
        onClickButton={() => {
          onCreateRoom({ title: roomData.title, isPrivate: roomData.isPrivate });
        }}
      >
        생성하기
      </MainButton>
    </>
  );
}

export default RoomCreationButton;
