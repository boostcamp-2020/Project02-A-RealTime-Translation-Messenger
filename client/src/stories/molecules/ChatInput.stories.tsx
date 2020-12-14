import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import ChatInput, { ChatInputPropsType } from '../../components/molecules/chatRoomPage/ChatInput';

export default {
  title: 'pupagoMolecule/ChatInput',
  component: ChatInput,
} as Meta;

const Template: Story<ChatInputPropsType> = (args) => <ChatInput {...args} />;

export const BigText = Template.bind({});
BigText.args = {
  value: '안녕하세요, 저는 자바스크립트 개발자 입니다. 자바스크립트가 너무 좋아요',
};

export const SmallText = Template.bind({});
SmallText.args = {
  value: '아토믹 디자인',
};
