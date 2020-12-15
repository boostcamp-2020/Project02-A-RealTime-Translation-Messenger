import React from 'react';
import { useIntl } from 'react-intl';
import styled from 'styled-components';
import MainPageNavigation from '../../../@types/mainPageNavigation';
import useNavigation from '../../../hooks/useNavigation';
import useUser from '../../../hooks/useUser';

import MainButton from '../../atoms/buttons/MainButton';

const RoomCreateButtonWrapper = styled.div`
  margin-bottom: 32px;
`;

const userInfoValidate = (nickname: string, imageLink: string | null) => {
  if (!/^[A-Z|a-z|가-힣]{2,12}$/.test(nickname)) return false;
  if (!imageLink) return false;
  return true;
};

function StartButtons() {
  const { nicknameData, imageLinkData } = useUser();
  const { onSetNavigation } = useNavigation();
  const { formatMessage } = useIntl();

  return (
    <>
      <RoomCreateButtonWrapper>
        <MainButton
          disabled={!userInfoValidate(nicknameData, imageLinkData)}
          onClickButton={() => {
            onSetNavigation(MainPageNavigation.ROOM_CREATION);
          }}
        >
          {formatMessage({ id: 'createRoom' })}
        </MainButton>
      </RoomCreateButtonWrapper>
      <MainButton
        disabled={!userInfoValidate(nicknameData, imageLinkData)}
        onClickButton={() => {
          onSetNavigation(MainPageNavigation.ROOM_LIST);
        }}
      >
        {formatMessage({ id: 'enterRoom' })}
      </MainButton>
    </>
  );
}

export default StartButtons;
