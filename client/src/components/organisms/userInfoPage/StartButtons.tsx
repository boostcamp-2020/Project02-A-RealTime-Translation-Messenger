import React from 'react';
import styled from 'styled-components';
import useUser from '../../../hooks/useUser';

import MainButton from '../../atoms/buttons/MainButton';

const RoomCreateButtonWrapper = styled.div`
  margin-bottom: 32px;
`;

const validate = (nickname: string, imageLink: string | null) => {
  if (nickname.length === 0) return false;
  if (!imageLink) return false;
  return true;
};

function StartButtons() {
  const { nicknameData, imageLinkData } = useUser();

  return (
    <>
      <RoomCreateButtonWrapper>
        <MainButton
          disabled={!validate(nicknameData, imageLinkData)}
          onClickButton={() => {
            console.log('hihi');
          }}
        >
          + 방 만들기
        </MainButton>
      </RoomCreateButtonWrapper>
      <MainButton
        disabled={!validate(nicknameData, imageLinkData)}
        onClickButton={() => {
          console.log('hihi');
        }}
      >
        참가하기
      </MainButton>
    </>
  );
}

export default StartButtons;
