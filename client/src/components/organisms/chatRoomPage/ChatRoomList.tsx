import React, { useEffect } from 'react';
import useRoomList from '../../../hooks/useRoomList';
import RefreshButton from '../../atoms/buttons/RefreshButton';
import RoomItem from '../../molecules/common/RoomItem';
import timeDisplay from '../../../utils/timeDisplay';
import useRoom from '../../../hooks/useRoom';

function ChatRoomList() {
  const { data: rooms, loading, error, onGetRoomList } = useRoomList();
  const { onJoinRoom } = useRoom();

  useEffect(() => {
    onGetRoomList();
  }, []);

  return (
    <>
      <RefreshButton onClickRefresh={onGetRoomList} size={'small'} />
      {rooms?.map((room) => (
        <RoomItem
          size="small"
          createdAt={timeDisplay.timeSinceKorean(room.createdAt)}
          participantCount={room.participantCount}
          roomCapacity={8}
          title={room.title}
          onClickItem={() => {}}
        />
      ))}
    </>
  );
}

export default ChatRoomList;
