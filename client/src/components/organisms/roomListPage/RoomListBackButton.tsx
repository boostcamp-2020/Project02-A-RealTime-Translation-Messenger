import React from 'react';

import IconButton from '../../../components/atoms/buttons/IconButton';
import Palette from '../../../@types/Palette';
import useNavigation from '../../../hooks/useNavigation';
import MainPageNavigation from '../../../@types/mainPageNavigation';

function RoomListBackButton() {
  const { onSetNavigation } = useNavigation();
  return (
    <IconButton
      iconType={'ArrowBack'}
      color={Palette.DARK_GREY}
      onClick={() => {
        onSetNavigation(MainPageNavigation.USER_INFO);
      }}
    ></IconButton>
  );
}

export default RoomListBackButton;
