import React from 'react';

import IconButton from '../../../components/atoms/buttons/IconButton';
import Palette from '../../../@types/Palette';
import useNavigation from '../../../hooks/useNavigation';
import MainPageNavigation from '../../../@types/mainPageNavigation';
import { IconType } from '../../../@types/types';

function RoomListBackButton() {
  const { onSetNavigation } = useNavigation();

  return (
    <IconButton
      iconType={IconType.ARROW_BACK}
      color={Palette.DARK_GREY}
      onClick={() => {
        onSetNavigation(MainPageNavigation.USER_INFO);
      }}
    ></IconButton>
  );
}

export default RoomListBackButton;
