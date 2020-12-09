import React from 'react';

import IconButton from '../../atoms/buttons/IconButton';

type BackButtonPropsType = {
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

function BackButton({ onClick }: BackButtonPropsType) {
  return <IconButton iconType="ArrowBack" color="black" onClick={onClick} />;
}

export default BackButton;
