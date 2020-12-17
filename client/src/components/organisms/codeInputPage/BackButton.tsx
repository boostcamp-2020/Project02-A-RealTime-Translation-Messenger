import React from 'react';

import MainPageNavigation from '../../../@types/mainPageNavigation';
import Palette from '../../../@types/Palette';
import { IconType } from '../../../@types/types';
import useNavigation from '../../../hooks/useNavigation';
import IconButton from '../../atoms/buttons/IconButton';

function BackButton() {
  const { onSetNavigation } = useNavigation();

  return (
    <IconButton
      iconType={IconType.ARROW_BACK}
      color={Palette.DARK_GREY}
      onClick={() => {
        onSetNavigation(MainPageNavigation.ROOM_LIST);
      }}
    />
  );
}

export default BackButton;
