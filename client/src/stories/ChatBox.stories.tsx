import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import ChatBox, { ChatBoxPropsType } from '../components/atoms/ChatBox';

export default {
  title: 'pupago/ChatBox',
  component: ChatBox,
} as Meta;

const Template: Story<ChatBoxPropsType> = (args) => <ChatBox {...args} />;

export const LongText = Template.bind({});
LongText.args = {
  leftMessage:
    '안녕하세요! 영어가 익숙하지 않아서 번역 채팅을 쓰니까 너무 편해요! 저희 어떤 토픽으로 대화를 하면 좋을까요? 번역이 잘 되는지도 한번 테스트 해볼까요?',
  rightMessage:
    "Hello! I'm not familiar with English, so it's so convenient to use translation chat! What topic should we talk about? Shall we test the translation?",
  isMe: true,
};

export const ShortText = Template.bind({});
ShortText.args = {
  leftMessage: 'ㅋㅋ',
  rightMessage: 'LOL',
  isMe: true,
};

export const ReceivedMessage = Template.bind({});
ReceivedMessage.args = {
  leftMessage: '스토리북 너무 이뻐요',
  rightMessage: 'Wow StoryBook!',
  isMe: false,
};
