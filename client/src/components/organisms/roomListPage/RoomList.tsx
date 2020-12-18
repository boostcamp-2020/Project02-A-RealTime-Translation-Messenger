import React, { useEffect } from 'react';
import styled from 'styled-components';

import useRoom from '../../../hooks/useRoom';
import useRoomList from '../../../hooks/useRoomList';
import RoomItem from '../../molecules/common/RoomItem';
import CryingPapago from './CryingPapago';
import ParticipantsLimit from '../../../@types/participantsLimit';
import useTimeDisplay from '../../../hooks/useTimeDisplay';

type WrapperType = {
  isEmpty: boolean;
};

const RoomListWrapper = styled.div<WrapperType>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 376px;
  height: ${(props) => (props.isEmpty ? '416px' : '384px')};
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 0px;
  }
`;

function RoomList() {
  const { data: roomListData, onGetRoomList } = useRoomList();
  const { onJoinRoom } = useRoom();
  const { onTimeSince } = useTimeDisplay();

  useEffect(() => {
    onGetRoomList();
  }, []);

  const returnList = () => {
    if (roomListData === null) {
      return <></>;
    } else if (roomListData!.length === 0) {
      return <CryingPapago />;
    } else {
      return roomListData!.map((room) => {
        return (
          <RoomItem
            key={room.roomCode}
            size="big"
            title={room.title}
            createdAt={onTimeSince(room.createdAt)}
            roomCapacity={ParticipantsLimit.PARTICIPATNS_MAX_COUNT}
            participantCount={room.participantCount}
            disabled={room.participantCount < ParticipantsLimit.PARTICIPATNS_MAX_COUNT ? false : true}
            onClickItem={() => {
              onJoinRoom({ roomCode: room.roomCode, isPrivate: false });
            }}
          />
        );
      });
    }
  };

  return <RoomListWrapper isEmpty={roomListData !== null && roomListData.length === 0}>{returnList()}</RoomListWrapper>;
}

export default RoomList;
