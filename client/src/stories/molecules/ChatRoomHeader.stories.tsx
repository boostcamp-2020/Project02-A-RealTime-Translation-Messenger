import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import ChatRoomHeader, { ChatRoomHeaderPropsType } from '../../components/molecules/chatRoomPages/ChatRoomHeader';

export default {
  title: 'pupagoMolecule/ChatRoomHeader',
  component: ChatRoomHeader,
} as Meta;

const Template: Story<ChatRoomHeaderPropsType> = (args) => <ChatRoomHeader {...args} />;

export const LongText = Template.bind({});
LongText.args = {
  title: '영어로 대화할 사람 구해요!',
  roomCode: '1A3B',
};

export const ShortText = Template.bind({});
ShortText.args = {
  title: '영어',
  roomCode: '1A3B',
};
