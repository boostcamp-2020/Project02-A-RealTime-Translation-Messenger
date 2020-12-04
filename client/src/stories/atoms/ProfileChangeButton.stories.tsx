import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { ProfileChangeButton } from '../../components/atoms/buttons/ProfileChangeButton';

export default {
  title: 'pupago/ProfileChangeButton',
  component: ProfileChangeButton,
} as Meta;

const Template: Story = (args) => <ProfileChangeButton {...args} />;

export const Active = Template.bind({});
