import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { RefreshButton, RefreshButtonTypes } from '../components/atoms/RefreshButton';

export default {
  title: 'pupago/RefreshButton',
  component: RefreshButton,
} as Meta;

const Template: Story<RefreshButtonTypes> = (args) => <RefreshButton {...args} />;

export const Default = Template.bind({});
