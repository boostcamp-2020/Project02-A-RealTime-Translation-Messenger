import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import ParticipantNotification, {
  ParticipantNotificationPropsType,
} from '../components/atoms/texts/ParticipantNotification';

export default {
  title: 'pupago/ParticiapantNotification',
  component: ParticipantNotification,
} as Meta;

const Template: Story<ParticipantNotificationPropsType> = (args) => <ParticipantNotification {...args} />;

export const KoreanEnter = Template.bind({});
KoreanEnter.args = {
  nickname: '쟈기쟈기쟈기쟈기쟈기쟈기',
  isEnter: true,
  language: 'KOREAN',
};

export const KoreanLeft = Template.bind({});
KoreanLeft.args = {
  nickname: '쟈기쟈기',
  isEnter: false,
  language: 'KOREAN',
};

export const EnglishEnter = Template.bind({});
EnglishEnter.args = {
  nickname: 'James',
  isEnter: true,
  language: 'ENGLISH',
};

export const EnglishLeft = Template.bind({});
EnglishLeft.args = {
  nickname: 'James',
  isEnter: false,
  language: 'ENGLISH',
};
