import React from 'react';
import styled from 'styled-components';

import Palette from '../../../@types/Palette';

const StyledParticipantNotification = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 240px;
  max-width: 400px;
  padding: 4px 20px;
  border-radius: 10px;
  background-color: ${Palette.MIDDLE_GREY};
  color: white;
  user-select: none;
`;

const NotificationText = styled.span`
  display: block;
  height: 16px;
`;

export type ParticipantNotificationPropsType = {
  nickname: string;
  isEnter: boolean;
  language: 'KOREAN' | 'ENGLISH';
};

function ParticipantNotification({ nickname, isEnter, language }: ParticipantNotificationPropsType) {
  return (
    <StyledParticipantNotification>
      {language === 'KOREAN' ? (
        <NotificationText>{`${nickname} 님이 ${isEnter ? '입장' : '퇴장'}하셨습니다.`}</NotificationText>
      ) : (
        <NotificationText>{`${nickname} has ${isEnter ? 'entered.' : 'left.'}`}</NotificationText>
      )}
    </StyledParticipantNotification>
  );
}

export default ParticipantNotification;
