import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { ChatModalBackground } from '../../components/atoms/boxes/ChatModalBackground';

export default {
  title: 'pupago/ChatModalBackground',
  component: ChatModalBackground,
} as Meta;

const Template: Story = (args) => <ChatModalBackground {...args} />;

export const Default = Template.bind({});
