import React from 'react';
import styled from 'styled-components';

import Palette from '../../../@types/Palette';

export type ProfileImagePropsType = {
  size: 'size-88' | 'size-72' | 'size-40' | 'size-24';
  isMe: boolean;
  image: string | null;
};

export type ProfileImageSrcProsType = {
  imageSize: string;
};

const setSize = (size: string): [string, string] => {
  switch (size) {
    case 'size-88':
      return ['88px', '76px'];
    case 'size-72':
      return ['72px', '60px'];
    case 'size-40':
      return ['40px', '32px'];
    case 'size-24':
      return ['24px', '18px'];
    default:
      return ['88px', '76px'];
  }
};

const StyledProfileImageSrc = styled.img<ProfileImageSrcProsType>`
  display: block;
  width: ${(props) => setSize(props.imageSize)[1]};
  height: ${(props) => setSize(props.imageSize)[1]};
  border-radius: 50%;
`;

const StyledProfileImage = styled.div<ProfileImagePropsType>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${(props) => setSize(props.size)[0]};
  height: ${(props) => setSize(props.size)[0]};
  ${(props) =>
    props.size === 'size-88' || props.size === 'size-72'
      ? `box-shadow: 1px 1px 5px 0 #00000040;
  border: solid 3px ${props.isMe ? Palette.PUPAGO_BLUE : Palette.LIGHT_GREY};`
      : `box-shadow: none;
  border: solid 2px ${props.isMe ? Palette.PUPAGO_BLUE : Palette.LIGHT_GREY};`}
  border-radius: 50%;
  background-color: WHITE;
`;

function ProfileImage({ size, isMe, image }: ProfileImagePropsType) {
  return (
    <StyledProfileImage size={size} isMe={isMe} image={image}>
      {image && <StyledProfileImageSrc alt="profile image" src={image} imageSize={size}></StyledProfileImageSrc>}
    </StyledProfileImage>
  );
}

export default ProfileImage;
