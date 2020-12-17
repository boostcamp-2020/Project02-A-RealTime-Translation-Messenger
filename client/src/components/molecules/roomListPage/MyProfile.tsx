import React from 'react';
import styled from 'styled-components';

import ProfileImage from '../../atoms/resources/ProfileImage';
import LanguageTag from '../../atoms/resources/LanguageTag';
import Text from '../../atoms/texts/Text';
import LangCode from '../../../@types/langCode';
import { TextSize } from '../../../@types/types';
import Palette from '../../../@types/Palette';

export type MyProfilePropsType = {
  image: string | null;
  language: LangCode;
  nickname: string;
};

const MyProfileBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 216px;
  height: 132px;
`;

const LanguageTagWrapper = styled.div`
  position: relative;
  left: 24px;
  bottom: 24px;
  z-index: 3;
`;

const NicknameText = styled(Text)`
  position: relative;
  bottom: 14px;
`;

function MyProfile({ image, language, nickname }: MyProfilePropsType) {
  return (
    <MyProfileBox>
      <ProfileImage size="size-72" isMe={true} image={image}></ProfileImage>
      <LanguageTagWrapper>
        <LanguageTag language={language} isMe={true} />
      </LanguageTagWrapper>
      <NicknameText size={TextSize.BIG} weight={'bold'} color={Palette.BLACK}>
        {nickname}
      </NicknameText>
    </MyProfileBox>
  );
}

export default MyProfile;
