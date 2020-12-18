import React from 'react';
import { Size } from '../../../@types/types';

import useRoomList from '../../../hooks/useRoomList';
import RefreshButtonAtom from '../../atoms/buttons/RefreshButton';

const RefreshButton = () => {
  const { onGetRoomList } = useRoomList();

  return (
    <div>
      <RefreshButtonAtom
        size={Size.BIG}
        onClickRefresh={() => {
          onGetRoomList();
        }}
      />
    </div>
  );
};

export default RefreshButton;
