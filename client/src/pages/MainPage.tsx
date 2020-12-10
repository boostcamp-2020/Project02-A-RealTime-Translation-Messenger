import React, { useState } from 'react';
import styled from 'styled-components';

import UserInfoPage from './UserInfoPage';
import MainPageBox from '../components/atoms/boxes/MainPageBox';
import MainPageNavigation from '../@types/mainPageNavigation';
import RoomListPage from './RoomListPage';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

function MainPage() {
  return (
    <Wrapper>
      <MainPageBox>
        <UserInfoPage />
      </MainPageBox>
    </Wrapper>
  );
}

export default MainPage;
