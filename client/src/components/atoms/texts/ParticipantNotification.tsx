import React from 'react';
import { useIntl } from 'react-intl';
import styled from 'styled-components';

import Palette from '../../../@types/Palette';

const StyledParticipantNotification = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 240px;
  max-width: 400px;
  margin-top: 24px;
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
  language: 'Korean' | 'English';
};

function ParticipantNotification({ nickname, isEnter, language }: ParticipantNotificationPropsType) {
  const { formatMessage } = useIntl();
  return (
    <StyledParticipantNotification>
      <NotificationText>
        {isEnter
          ? formatMessage({ id: 'enterRoom' }, { name: nickname })
          : formatMessage({ id: 'leaveRoom' }, { name: nickname })}
      </NotificationText>
    </StyledParticipantNotification>
  );
}

export default ParticipantNotification;
