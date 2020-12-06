import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { CryingPapago } from '../components/atoms/CryingPapago';

export default {
  title: 'pupago/CryingPapago',
  component: CryingPapago,
} as Meta;

const Template: Story = (args) => <CryingPapago {...args} />;

export const Active = Template.bind({});
