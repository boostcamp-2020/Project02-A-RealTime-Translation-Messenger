import React from 'react';
import useRoomList from '../../../hooks/useRoomList';
import RefreshButtonAtom from '../../atoms/buttons/RefreshButton';

const RefreshButton = () => {
  const { onGetRoomList } = useRoomList();

  return (
    <div>
      <RefreshButtonAtom
        onClickRefresh={() => {
          onGetRoomList();
        }}
      />
    </div>
  );
};

export default RefreshButton;
