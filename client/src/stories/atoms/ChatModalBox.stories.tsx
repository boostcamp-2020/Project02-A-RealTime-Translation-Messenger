import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { ChatModalBox } from '../../components/atoms/boxes/ChatModalBox';

export default {
  title: 'pupagoAtom/ChatModalBox',
  component: ChatModalBox,
} as Meta;

const Template: Story = (args) => <ChatModalBox {...args} />;

export const Default = Template.bind({});
