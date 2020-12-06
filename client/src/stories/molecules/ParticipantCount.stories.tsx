import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import ParticipantCount, { ParticipantCountPropsType } from '../../components/molecules/chatRoomPage/ParticipantCount';

export default {
  title: 'pupagoMolecule/ParticipantCount',
  component: ParticipantCount,
} as Meta;

const Template: Story<ParticipantCountPropsType> = (args) => <ParticipantCount {...args} />;

export const Default = Template.bind({});
Default.args = {
  maxCapacity: 8,
  participatingCount: 1,
};
