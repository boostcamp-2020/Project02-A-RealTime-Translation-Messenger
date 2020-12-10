import React from 'react';
import styled from 'styled-components';

import MainTitle from '../components/molecules/userInfoPage/MainTitle';
import LanguageSelection from '../components/organisms/userInfoPage/LanguageSelection';
import NicknameInput from '../components/organisms/userInfoPage/NicknameInput';
import ProfilePictureSelection from '../components/organisms/userInfoPage/ProfilePictureSelection';
import StartButtons from '../components/organisms/userInfoPage/StartButtons';

const ProfilePictureSelectionWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 32px;
`;

const LanguageSelectionwrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 50px;
`;

const NickNameInputWrapper = styled.div`
  margin-bottom: 56px;
`;

function UserInfoPage() {
  return (
    <>
      <MainTitle />
      <ProfilePictureSelectionWrapper>
        <ProfilePictureSelection />
      </ProfilePictureSelectionWrapper>
      <LanguageSelectionwrapper>
        <LanguageSelection />
      </LanguageSelectionwrapper>
      <NickNameInputWrapper>
        <NicknameInput />
      </NickNameInputWrapper>
      <StartButtons />
    </>
  );
}

export default UserInfoPage;
