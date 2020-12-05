import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import ChatItem, { ChatItemPropsType } from '../../components/molecules/chatRoomPage/ChatItem';

export default {
  title: 'pupagoMolecule/ChatItem',
  component: ChatItem,
} as Meta;

const Template: Story<ChatItemPropsType> = (args) => <ChatItem {...args} />;

export const Me = Template.bind({});
Me.args = {
  leftMessage: '안녕하세요',
  rightMessage: 'hello',
  isMe: true,
  nickname: '모아이',
  imageLink: 'https://i.imgur.com/O3G3HwR.jpg',
  createdAt: '13:16 pm',
};

export const You = Template.bind({});
You.args = {
  leftMessage: '자바스크립트가 좋아요',
  rightMessage: 'I love JavaScript',
  isMe: false,
  nickname: 'FE-developer',
  imageLink: 'https://i.imgur.com/O3G3HwR.jpg',
  createdAt: '13:17 pm',
};
