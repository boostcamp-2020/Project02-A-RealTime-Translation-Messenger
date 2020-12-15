import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

import useRoom from '../../../hooks/useRoom';
import useRoomList from '../../../hooks/useRoomList';
import RoomItem from '../../molecules/common/RoomItem';
import timeDisplay from '../../../utils/timeDisplay';
import CryingPapago from './CryingPapago';
import ParticipantsLimit from '../../../@types/participantsLimit';
import useUser from '../../../hooks/useUser';

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
  const { data: roomData, onJoinRoom, loading, error } = useRoom();

  const history = useHistory();

  useEffect(() => {
    onGetRoomList();
  }, []);

  useEffect(() => {
    if (!error && !loading && roomData.roomCode !== '') {
      // 채팅 페이지로 이동
      history.push('/chat');
    }
  }, [roomData.roomCode]);

  const returnList = () => {
    const { languageData } = useUser();
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
            createdAt={
              languageData === 'ko'
                ? timeDisplay.timeSinceKorean(room.createdAt)
                : timeDisplay.timeSinceEnglish(room.createdAt)
            }
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
