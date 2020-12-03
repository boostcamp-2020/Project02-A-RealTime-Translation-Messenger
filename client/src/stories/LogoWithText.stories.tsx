import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { LogoWithText } from '../components/atoms/LogoWithText';

export default {
  title: 'pupago/LogoWithText',
  component: LogoWithText,
} as Meta;

const Template: Story = (args) => <LogoWithText {...args} />;

export const Active = Template.bind({});
