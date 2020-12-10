import React from 'react';

import IconButton from '../../../components/atoms/buttons/IconButton';
import Palette from '../../../@types/Palette';
import useNavigation from '../../../hooks/useNavigation';
import MainPageNavigation from '../../../@types/mainPageNavigation';
import useRoom from '../../../hooks/useRoom';

function BackButton() {
  const { onSetNavigation } = useNavigation();
  const { onResetRoomState } = useRoom();
  return (
    <IconButton
      iconType={'ArrowBack'}
      color={Palette.DARK_GREY}
      onClick={() => {
        onSetNavigation(MainPageNavigation.USER_INFO);
        onResetRoomState();
      }}
    ></IconButton>
  );
}

export default BackButton;
