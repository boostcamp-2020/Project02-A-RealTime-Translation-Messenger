import React from 'react';

import IconButton from '../../../components/atoms/buttons/IconButton';
import Palette from '../../../@types/Palette';

function BackButton() {
  return <IconButton iconType={'ArrowBack'} color={Palette.DARK_GREY} onClick={() => {}}></IconButton>;
}

export default BackButton;
