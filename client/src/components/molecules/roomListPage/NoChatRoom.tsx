import React from 'react';
import styled from 'styled-components';

import Text from '../../atoms/texts/Text';
import CryingPapago from '../../atoms/resources/CryingPapago';

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
  return (
    <NoChatRoomBox>
      <NoChatRoomText size={14}>채팅방이 없어요!</NoChatRoomText>
      <CryingPapago />
      <CreateRoomText size={14}>방을 만들고 대화를 시작해보세요!</CreateRoomText>
    </NoChatRoomBox>
  );
}

export default NoChatRoom;
