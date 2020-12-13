import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import useRoomList from '../../../hooks/useRoomList';
import RefreshButton from '../../atoms/buttons/RefreshButton';
import RoomItem from '../../molecules/common/RoomItem';
import timeDisplay from '../../../utils/timeDisplay';
import useRoom from '../../../hooks/useRoom';
import RoomSwitchModal from '../../molecules/chatRoomPage/RoomSwitchModal';
import { useHistory } from 'react-router-dom';
import useReset from '../../../hooks/useReset';
import { JoiningRoomType } from '../../../@types/types';

const ChatRoomListWrapper = styled.div`
  position: relative;
`;

const RoomSwitchWrapper = styled.div`
  position: absolute;
  z-index: 5;
  right: -24px;
  top: -88px;
`;

function ChatRoomList() {
  const { data: rooms, onGetRoomList } = useRoomList();
  const { onJoinRoom, data: roomData } = useRoom();
  const [isSwitching, setIsSwitching] = useState(false);
  const [switchingRoom, setSwitchingRoom] = useState<JoiningRoomType>({
    roomCode: '',
    isPrivate: 'false',
  });
  const history = useHistory();
  const { onReset } = useReset();

  useEffect(() => {
    onGetRoomList();
  }, []);

  return (
    <ChatRoomListWrapper>
      {isSwitching && (
        <RoomSwitchWrapper>
          <RoomSwitchModal
            onClickConfirm={() => {
              setIsSwitching(false);
              onReset();
              onJoinRoom(switchingRoom);
              onGetRoomList();
              history.push('/loading');
            }}
            onClickBackground={() => {
              setIsSwitching(false);
            }}
            onClickCancel={() => {
              setIsSwitching(false);
            }}
            onClickClose={() => {
              setIsSwitching(false);
            }}
          />
        </RoomSwitchWrapper>
      )}
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
    </ChatRoomListWrapper>
  );
}

export default ChatRoomList;
