import React from 'react';
import styled from 'styled-components';

import Palette from '../../@types/Palette';

export type ProfileImagePropsType = {
  width: number;
  height: number;
  border: number;
};

const StyledProfileImage = styled.div<ProfileImagePropsType>`
  width: ${(props) => `${props.width.toString()}px`};
  height: ${(props) => `${props.height.toString()}px`};
  padding: 7.8px 0px 0 7.8px;
  box-shadow: 1px 1px 5px 0 #00000040;
  border: solid ${(props) => `${props.border.toString()}px`} ${Palette.PUPAGO_BLUE};
  border-radius: 100px;
  background-color: WHITE;
`;

export function ProfileImage({ width, height, border }: ProfileImagePropsType) {
  return <StyledProfileImage width={width} height={height} border={border} />;
}

export default ProfileImage;
