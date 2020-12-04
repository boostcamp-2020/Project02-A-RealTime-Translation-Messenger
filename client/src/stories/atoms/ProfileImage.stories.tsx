import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { ProfileImage, ProfileImagePropsType } from '../../components/atoms/resources/ProfileImage';

export default {
  title: 'pupago/ProfileImage',
  component: ProfileImage,
} as Meta;

const Template: Story<ProfileImagePropsType> = (args) => <ProfileImage {...args} />;

export const Active = Template.bind({});
Active.args = {
  size: 'size-88',
  isMe: true,
  image: `https://i.imgur.com/O3G3HwR.jpg`,
};

export const Disabled = Template.bind({});
Disabled.args = {
  size: 'size-88',
  isMe: false,
  image: `https://i.imgur.com/O3G3HwR.jpg`,
};
