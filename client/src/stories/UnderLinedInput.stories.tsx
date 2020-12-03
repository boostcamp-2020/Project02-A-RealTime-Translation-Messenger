import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import UnderLinedInput, { UnderLinedInputType } from '../components/atoms/UnderLinedInput';

export default {
  title: 'pupago/UnderLinedInput',
  component: UnderLinedInput,
} as Meta;

const Template: Story<UnderLinedInputType> = (args) => <UnderLinedInput {...args} />;

export const TextExist = Template.bind({});
TextExist.args = {
  value: '안녕',
};

export const TextNotExist = Template.bind({});
TextNotExist.args = {
  placeholder: '닉네임을 입력해보아라',
};

export const TextTooMany = Template.bind({});
TextTooMany.args = {
  value: '가나다라마바사아자차카타파하ABCDEFGHIJKLMNOP',
};
