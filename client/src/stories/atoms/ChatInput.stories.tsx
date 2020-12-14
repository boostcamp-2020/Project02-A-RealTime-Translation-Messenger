import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import ChatInput, { ChatInputPropsType } from '../../components/atoms/inputs/ChatInput';

export default {
  title: 'pupagoAtom/ChatInput',
  component: ChatInput,
} as Meta;

const Template: Story<ChatInputPropsType> = (args) => <ChatInput {...args} />;

export const Empty = Template.bind({});
Empty.args = {
  value: '',
};

export const LongText = Template.bind({});
LongText.args = {
  value:
    '안녕하세요! 영어가 익숙하지 않아서 번역 채팅을 쓰니까 너무 편해요! 저희 어떤 토픽으로 대화를 하면 좋을까요? 번역이 잘 되는지도 한번 테스트 해볼까요?',
};

export const NormalText = Template.bind({});
NormalText.args = {
  value: 'CSS는 너무 사랑스러워',
};
