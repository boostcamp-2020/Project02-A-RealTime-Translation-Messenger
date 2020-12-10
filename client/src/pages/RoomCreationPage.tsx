import React from 'react';
import styled from 'styled-components';

import BackButton from '../components/organisms/roomCreationPage/BackButton';
import RoomCreation from '../components/organisms/roomCreationPage/RoomCreation';
import RoomCreationButton from '../components/organisms/roomCreationPage/RoomCreationButton';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 336px;
  height: 656px;
`;

function RoomCreationPage() {
  return (
    <Wrapper>
      <BackButton />
      <RoomCreation />
      <RoomCreationButton />
    </Wrapper>
  );
}

export default RoomCreationPage;
