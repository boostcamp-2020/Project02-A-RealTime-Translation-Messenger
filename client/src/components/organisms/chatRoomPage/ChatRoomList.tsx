import React, { useEffect } from 'react';
import useRoomList from '../../../hooks/useRoomList';
import RefreshButton from '../../atoms/buttons/RefreshButton';
import RoomItem from '../../molecules/common/RoomItem';

function ChatRoomList() {
  const { data: rooms, loading, error, onGetRoomList } = useRoomList();

  useEffect(() => {
    onGetRoomList();
  }, []);

  return (
    <>
      <RefreshButton onClickRefresh={onGetRoomList} size={'small'} />
      {rooms?.map((room) => (
        <RoomItem
          size="small"
          createdAt={room.createdAt}
          participantCount={room.participantCount}
          roomCapacity={8}
          title={room.title}
          onClickItem={onGetRoomList}
        />
      ))}
    </>
  );
}

export default ChatRoomList;
