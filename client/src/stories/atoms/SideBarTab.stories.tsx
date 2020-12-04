import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import SideBarTab, { SideBarTabPropsType } from '../components/atoms/buttons/SideBarTab';

export default {
  title: 'pupago/SideBarTab',
  component: SideBarTab,
} as Meta;

const Template: Story<SideBarTabPropsType> = (args) => <SideBarTab {...args} />;

export const ActiveParticipant = Template.bind({});
ActiveParticipant.args = {
  children: '참여자',
  isSelected: true,
  isTabNameParticipant: true,
};

export const DisabledParticipant = Template.bind({});
DisabledParticipant.args = {
  children: '참여자',
  isSelected: false,
  isTabNameParticipant: true,
};

export const ActiveChatRoom = Template.bind({});
ActiveChatRoom.args = {
  children: '채팅방',
  isSelected: true,
  isTabNameParticipant: false,
};

export const DisabledChatRoom = Template.bind({});
DisabledChatRoom.args = {
  children: '채팅방',
  isSelected: false,
  isTabNameParticipant: false,
};
