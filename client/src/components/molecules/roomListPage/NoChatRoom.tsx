import React from 'react';
import styled from 'styled-components';

import Text from '../../atoms/texts/Text';
import CryingPapago from '../../atoms/resources/CryingPapago';

export type NoChatRoomPropsType = {
  noChatRoomText: string;
  createRoomText: string;
};

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

function NoChatRoom({ noChatRoomText, createRoomText }: NoChatRoomPropsType) {
  return (
    <NoChatRoomBox>
      <NoChatRoomText size={14}>{noChatRoomText}</NoChatRoomText>
      <CryingPapago />
      <CreateRoomText size={14}>{createRoomText}</CreateRoomText>
    </NoChatRoomBox>
  );
}

export default NoChatRoom;
