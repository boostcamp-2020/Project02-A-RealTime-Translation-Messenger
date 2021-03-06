import React from 'react';

import RoomCreationMolecule from '../../molecules/roomCreationPage/RoomCreation';
import useRoom from '../../../hooks/useRoom';
import CharacterLimit from '../../../@types/characterLimit';

function RoomCreation() {
  const { data: roomData, onSetRoomTitle, onSetIsPrivate } = useRoom();

  return (
    <div>
      <RoomCreationMolecule
        TypedWordCount={roomData.title.length}
        MaxWordCount={CharacterLimit.ROOM_NAME_MAX}
        privateSelected={roomData.isPrivate}
        value={roomData.title}
        isPrivateOnClick={onSetIsPrivate}
        InputOnChange={(e) => {
          onSetRoomTitle(e.target.value.substring(0, CharacterLimit.ROOM_NAME_MAX));
        }}
      />
    </div>
  );
}

export default RoomCreation;
