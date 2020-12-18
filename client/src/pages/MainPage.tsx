import React, { lazy, Suspense, useEffect } from 'react';
import styled from 'styled-components';

const UserInfoPage = lazy(() => import('./UserInfoPage'));
const RoomCreationPage = lazy(() => import('./RoomCreationPage'));
const RoomListPage = lazy(() => import('./RoomListPage'));
const CodeInputPage = lazy(() => import('./CodeInputPage'));

import MainPageBox from '../components/atoms/boxes/MainPageBox';
import MainPageNavigation from '../@types/mainPageNavigation';
import useNavigation from '../hooks/useNavigation';
import useReset from '../hooks/useReset';
import useUser from '../hooks/useUser';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

function MainPage() {
  const { navigation, onSetNavigation } = useNavigation();
  const { onReset } = useReset();
  const { socketData } = useUser();

  useEffect(() => {
    socketData?.disconnect();
    onReset();
    onSetNavigation(MainPageNavigation.USER_INFO);
  }, []);

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
      <MainPageBox>
        <Suspense fallback={<div />}>{renderMainPage(navigation)}</Suspense>
      </MainPageBox>
    </Wrapper>
  );
}

export default MainPage;
