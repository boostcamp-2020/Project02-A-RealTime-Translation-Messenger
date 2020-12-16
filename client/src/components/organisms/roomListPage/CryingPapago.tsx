import React from 'react';
import { useIntl } from 'react-intl';
import styled from 'styled-components';

import MainPageNavigation from '../../../@types/mainPageNavigation';
import useNavigation from '../../../hooks/useNavigation';
import MainButton from '../../atoms/buttons/MainButton';
import NoChatRoomMolecule from '../../molecules/roomListPage/NoChatRoom';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 344px;
  height: 344px;
  margin-top: 32px;
`;

function CryingPapago() {
  const { onSetNavigation } = useNavigation();
  const { formatMessage } = useIntl();
  return (
    <Wrapper>
      <NoChatRoomMolecule />
      <MainButton
        disabled={false}
        onClickButton={() => {
          onSetNavigation(MainPageNavigation.ROOM_CREATION);
        }}
      >
        {formatMessage({ id: 'createRoom' })}
      </MainButton>
    </Wrapper>
  );
}

export default CryingPapago;
