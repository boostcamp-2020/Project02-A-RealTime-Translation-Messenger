import React from 'react';

import MainPageNavigation from '../@types/mainPageNavigation';
import MainTitle from '../components/molecules/userInfoPage/MainTitle';
import LanguageSelection from '../components/organisms/userInfoPage/LanguageSelection';
import NicknameInput from '../components/organisms/userInfoPage/NicknameInput';
import ProfilePictureSelection from '../components/organisms/userInfoPage/ProfilePictureSelection';
import StartButtons from '../components/organisms/userInfoPage/StartButtons';
import useNavigation from '../hooks/useNavigation';

function UserInfoPage() {
  const { navigation } = useNavigation();

  if (navigation !== MainPageNavigation.USER_INFO) return null;
  return (
    <>
      <div>
        <MainTitle />
        <ProfilePictureSelection />
        <LanguageSelection />
        <NicknameInput />
        <StartButtons />
      </div>
    </>
  );
}

export default UserInfoPage;
