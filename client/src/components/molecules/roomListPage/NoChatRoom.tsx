import React from 'react';
import styled from 'styled-components';

import Text from '../../atoms/texts/Text';
import CryingPapago from '../../atoms/resources/CryingPapago';
import { useIntl } from 'react-intl';

const NoChatRoomBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 256px;
  height: 300px;
`;

const NoChatRoomText = styled(Text)`
  margin-bottom: 15px;
`;

const CreateRoomText = styled(Text)`
  margin-top: 98px;
`;

function NoChatRoom() {
  const { formatMessage } = useIntl();
  return (
    <NoChatRoomBox>
      <NoChatRoomText size={14}>{formatMessage({ id: 'thereIsNoChatRoom' })}</NoChatRoomText>
      <CryingPapago />
      <CreateRoomText size={14}>{formatMessage({ id: 'startYourOwnChatRoom' })}</CreateRoomText>
    </NoChatRoomBox>
  );
}

export default NoChatRoom;
