import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import NoChatRoom from '../../components/molecules/roomListPage/NoChatRoom';

export default {
  title: 'pupagoMolecule/NoChatRoom',
  component: NoChatRoom,
} as Meta;

const Template: Story = (args) => <NoChatRoom {...args} />;

export const Korean = Template.bind({});
Korean.args = {};
