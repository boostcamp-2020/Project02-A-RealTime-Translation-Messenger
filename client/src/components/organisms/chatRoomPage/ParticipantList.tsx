import React from 'react';
import styled from 'styled-components';
import LangCode from '../../../@types/langCode';

import useParticipantsList from '../../../hooks/useParticipantsList';
import useUser from '../../../hooks/useUser';
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
  const { socketIdData } = useUser();

  return (
    <>
      <ParticipantCountWrapper>
        <ParticipantCount participatingCount={participants.length} maxCapacity={8} />
      </ParticipantCountWrapper>
      {participants
        .filter((participant) => participant.socketId === socketIdData)
        .map((participant) => (
          <ParticipantItemWrapper key={participant.socketId}>
            <ParticipantItem
              imageLink={participant.imageLink}
              language={participant.language as LangCode}
              isMe={participant.socketId === socketIdData}
              nickname={participant.nickname}
            />
          </ParticipantItemWrapper>
        ))}

      {participants
        .filter((participant) => participant.socketId !== socketIdData)
        .map((participant) => (
          <ParticipantItemWrapper key={participant.socketId}>
            <ParticipantItem
              imageLink={participant.imageLink}
              language={participant.language as LangCode}
              isMe={participant.socketId === socketIdData}
              nickname={participant.nickname}
            />
          </ParticipantItemWrapper>
        ))}
    </>
  );
}

export default ParticipantList;
