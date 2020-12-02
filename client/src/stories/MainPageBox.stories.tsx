import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { MainPageBox, } from '../components/atoms/MainPageBox';

export default {
  title: 'pupago/MainPageBox',
  component: MainPageBox,
} as Meta;

const Template: Story = (args) => <MainPageBox {...args} />;

export const Active = Template.bind({});