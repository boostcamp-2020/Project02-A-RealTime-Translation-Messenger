import React from 'react';
import styled from 'styled-components';

import ProfileImage from '../../atoms/resources/ProfileImage';
import ProfileChangeButton from '../../atoms/buttons/ProfileChangeButton';

const ProfileChangeButtonWrapper = styled.div`
  position: relative;
  left: 62px;
  bottom: 33px;
  z-index: 3;
`;

export type ProfilePictureSelectionPropsType = {
  image: string;
};

function ProfilePictureSelection({ image }: ProfilePictureSelectionPropsType) {
  return (
    <div>
      <ProfileImage size="size-88" isMe={true} image={image}></ProfileImage>
      <ProfileChangeButtonWrapper>
        <ProfileChangeButton />
      </ProfileChangeButtonWrapper>
    </div>
  );
}

export default ProfilePictureSelection;
