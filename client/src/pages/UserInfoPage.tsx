import React from 'react';

import MainTitle from '../components/molecules/userInfoPage/MainTitle';
import LanguageSelection from '../components/organisms/userInfoPage/LanguageSelection';
import NicknameInput from '../components/organisms/userInfoPage/NicknameInput';
import ProfilePictureSelection from '../components/organisms/userInfoPage/ProfilePictureSelection';
import StartButtons from '../components/organisms/userInfoPage/StartButtons';

function UserInfoPage() {
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
