import React from 'react';
import styled from 'styled-components';

import useParticipantsList from '../../../hooks/useParticipantsList';
import ParticipantCount from '../../molecules/chatRoomPage/ParticipantCount';
import ParticipantItem from '../../molecules/chatRoomPage/ParticipantItem';

const ParticipantItemWrapper = styled.div`
  margin: 12px 0;
`;

const ParticipantCountWrapper = styled.div`
  width: 48px;
  margin-left: auto;
`;

function ParticipantList() {
  const { data: participants } = useParticipantsList();

  return (
    <>
      <ParticipantCountWrapper>
        <ParticipantCount participatingCount={participants.length} maxCapacity={8} />
      </ParticipantCountWrapper>
      {participants.map((participant) => (
        <ParticipantItemWrapper>
          <ParticipantItem
            key={participant.socketId}
            imageLink={participant.imageLink}
            language={participant.language as 'Korean' | 'English'}
            isMe={true}
            nickname={participant.nickname}
          />
        </ParticipantItemWrapper>
      ))}
    </>
  );
}

export default ParticipantList;
