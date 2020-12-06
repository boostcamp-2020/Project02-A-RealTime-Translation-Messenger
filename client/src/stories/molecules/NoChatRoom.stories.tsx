import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import NoChatRoom, { NoChatRoomPropsType } from '../../components/molecules/roomListPage/NoChatRoom';

export default {
  title: 'pupagoMolecule/NoChatRoom',
  component: NoChatRoom,
} as Meta;

const Template: Story<NoChatRoomPropsType> = (args) => <NoChatRoom {...args} />;

export const Korean = Template.bind({});
Korean.args = {
  noChatRoomText: '채팅방이 없어요!',
  createRoomText: '방을 만들고 대화를 시작해보세요!',
};

export const English = Template.bind({});
English.args = {
  noChatRoomText: "There's no chat room!",
  createRoomText: 'Create a room and start a conversation!',
};
