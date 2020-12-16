import React, { useEffect } from 'react';

import useRoomList from '../../../hooks/useRoomList';
import RefreshButton from '../../atoms/buttons/RefreshButton';
import RoomItem from '../../molecules/common/RoomItem';
import timeDisplay from '../../../utils/timeDisplay';
import useRoom from '../../../hooks/useRoom';
import { JoiningRoomType } from '../../../@types/types';
import ParticipantsLimit from '../../../@types/participantsLimit';
import useUser from '../../../hooks/useUser';

type ChatRoomListPropsType = {
  setIsSwitching: React.Dispatch<React.SetStateAction<boolean>>;
  setSwitchingRoom: React.Dispatch<React.SetStateAction<JoiningRoomType>>;
};

function ChatRoomList({ setIsSwitching, setSwitchingRoom }: ChatRoomListPropsType) {
  const { data: rooms, onGetRoomList } = useRoomList();
  const { data: roomData } = useRoom();
  const { languageData } = useUser();

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
            createdAt={
              languageData === 'ko'
                ? timeDisplay.timeSinceKorean(room.createdAt)
                : timeDisplay.timeSinceEnglish(room.createdAt)
            }
            participantCount={room.participantCount}
            roomCapacity={ParticipantsLimit.PARTICIPATNS_MAX_COUNT}
            title={room.title}
            onClickItem={() => {
              setIsSwitching(true);
              setSwitchingRoom({ roomCode: room.roomCode, isPrivate: false });
            }}
            disabled={room.participantCount === ParticipantsLimit.PARTICIPATNS_MAX_COUNT}
          />
        ))}
    </div>
  );
}

export default ChatRoomList;
