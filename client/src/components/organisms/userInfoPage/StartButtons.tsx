import React from 'react';
import { useIntl } from 'react-intl';
import styled from 'styled-components';

import MainPageNavigation from '../../../@types/mainPageNavigation';
import useNavigation from '../../../hooks/useNavigation';
import useUser from '../../../hooks/useUser';
import validation from '../../../utils/validation';
import MainButton from '../../atoms/buttons/MainButton';

const RoomCreateButtonWrapper = styled.div`
  margin-bottom: 32px;
`;

function StartButtons() {
  const { nicknameData, imageLinkData } = useUser();
  const { onSetNavigation } = useNavigation();
  const { formatMessage } = useIntl();

  return (
    <>
      <RoomCreateButtonWrapper>
        <MainButton
          disabled={!validation.isValidUserInfo(nicknameData, imageLinkData)}
          onClickButton={() => {
            onSetNavigation(MainPageNavigation.ROOM_CREATION);
          }}
        >
          {formatMessage({ id: 'createRoom' })}
        </MainButton>
      </RoomCreateButtonWrapper>
      <MainButton
        disabled={!validation.isValidUserInfo(nicknameData, imageLinkData)}
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
