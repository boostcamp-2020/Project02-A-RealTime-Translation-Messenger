import React from 'react';

import MainPageNavigation from '../../../@types/mainPageNavigation';
import Palette from '../../../@types/Palette';
import useNavigation from '../../../hooks/useNavigation';
import IconButton from '../../atoms/buttons/IconButton';

function BackButton() {
  const { onSetNavigation } = useNavigation();
  return (
    <IconButton
      iconType="ArrowBack"
      color={Palette.DARK_GREY}
      onClick={() => {
        onSetNavigation(MainPageNavigation.ROOM_LIST);
      }}
    />
  );
}

export default BackButton;
