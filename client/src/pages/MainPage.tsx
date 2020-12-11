import React from 'react';
import styled from 'styled-components';

import UserInfoPage from './UserInfoPage';
import RoomCreationPage from './RoomCreationPage';
import RoomListPage from './RoomListPage';
import MainPageBox from '../components/atoms/boxes/MainPageBox';
import MainPageNavigation from '../@types/mainPageNavigation';
import CodeInputPage from './CodeInputPage';
import useNavigation from '../hooks/useNavigation';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

function MainPage() {
  const { navigation } = useNavigation();

  const renderMainPage = (navigation: MainPageNavigation) => {
    switch (navigation) {
      case MainPageNavigation.USER_INFO:
        return <UserInfoPage />;
      case MainPageNavigation.ROOM_CREATION:
        return <RoomCreationPage />;
      case MainPageNavigation.ROOM_LIST:
        return <RoomListPage />;
      case MainPageNavigation.CODE_INPUT:
        return <CodeInputPage />;
      default:
        return <UserInfoPage />;
    }
  };

  return (
    <Wrapper>
      <MainPageBox>{renderMainPage(navigation)}</MainPageBox>
    </Wrapper>
  );
}

export default MainPage;
