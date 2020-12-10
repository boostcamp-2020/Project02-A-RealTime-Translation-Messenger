import React, { useEffect } from 'react';
import styled from 'styled-components';
import useRoom from '../../../hooks/useRoom';
import useRoomList from '../../../hooks/useRoomList';
import RoomItem from '../../molecules/common/RoomItem';
import timeDisplay from '../../../utils/timeDisplay';

const RoomListWrapper = styled.div`
  width: 360px;
  height: 416px;
  margin-left: 16px;
  overflow: scroll;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    width: 0px;
  }
`;

function RoomList() {
  const { data: roomListData, onGetRoomList } = useRoomList();
  const { onJoinRoom, loading, error } = useRoom();

  useEffect(() => {
    onGetRoomList();
  }, []);

  return (
    <RoomListWrapper>
      {roomListData.map((room) => {
        return (
          <RoomItem
            key={room.roomCode}
            size="big"
            title={room.title}
            createdAt={timeDisplay.timeSinceKorean(room.createdAt)}
            roomCapacity={8}
            participantCount={room.participantCount}
            onClickItem={() => {
              onJoinRoom({ roomCode: room.roomCode, isPrivate: 'false' });
              if (!error && !loading) {
                // 채팅페이지로 이동
              }
            }}
          />
        );
      })}
    </RoomListWrapper>
  );
}

export default RoomList;
