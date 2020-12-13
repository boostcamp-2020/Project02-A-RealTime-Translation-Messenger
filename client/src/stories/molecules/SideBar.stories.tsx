import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import SideBar, { SideBarPropsType } from '../../components/molecules/chatRoomPage/SideBar';

export default {
  title: 'pupagoMolecule/SideBar',
  component: SideBar,
} as Meta;

const Template: Story<SideBarPropsType> = (args) => <SideBar {...args} />;

export const PaddingShow = Template.bind({});
PaddingShow.args = {
  children: 'Padding을 보여주기 위한 텍스트',
  selected: 'participants',
};

export const Empty = Template.bind({});
Empty.args = {
  children: '',
  selected: 'chatrooms',
};
