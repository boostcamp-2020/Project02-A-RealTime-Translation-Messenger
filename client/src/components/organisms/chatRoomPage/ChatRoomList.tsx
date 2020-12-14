import React, { useEffect, useState } from 'react';

import useRoomList from '../../../hooks/useRoomList';
import RefreshButton from '../../atoms/buttons/RefreshButton';
import RoomItem from '../../molecules/common/RoomItem';
import timeDisplay from '../../../utils/timeDisplay';
import useRoom from '../../../hooks/useRoom';
import { JoiningRoomType } from '../../../@types/types';

type ChatRoomListPropsType = {
  setIsSwitching: React.Dispatch<React.SetStateAction<boolean>>;
  setSwitchingRoom: React.Dispatch<React.SetStateAction<JoiningRoomType>>;
};

function ChatRoomList({ setIsSwitching, setSwitchingRoom }: ChatRoomListPropsType) {
  const { data: rooms, onGetRoomList } = useRoomList();
  const { data: roomData } = useRoom();

  useEffect(() => {
    onGetRoomList();
  }, []);

  return (
    <div>
      <RefreshButton onClickRefresh={onGetRoomList} size={'small'} />
      {rooms
        ?.filter((room) => room.roomCode !== roomData.roomCode)
        .map((room) => (
          <RoomItem
            key={room.roomCode}
            size="small"
            createdAt={timeDisplay.timeSinceKorean(room.createdAt)}
            participantCount={room.participantCount}
            roomCapacity={8}
            title={room.title}
            onClickItem={() => {
              setIsSwitching(true);
              setSwitchingRoom({ roomCode: room.roomCode, isPrivate: 'false' });
            }}
          />
        ))}
    </div>
  );
}

export default ChatRoomList;
