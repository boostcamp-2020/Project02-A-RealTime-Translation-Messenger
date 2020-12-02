import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { ProfileImage, ProfileImagePropsType } from '../components/atoms/ProfileImage';

export default {
  title: 'pupago/ProfileImage',
  component: ProfileImage,
} as Meta;

const Template: Story<ProfileImagePropsType> = (args) => <ProfileImage {...args} />;

export const Active = Template.bind({});
Active.args = {
  width: 88,
  height: 88,
  border: 3,
};
