import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import Text, { TextPropsType } from '../components/atoms/Text';

export default {
  title: 'pupago/Text',
  component: Text,
} as Meta;

const Template: Story<TextPropsType> = (args) => <Text {...args} />;

export const Active = Template.bind({});
Active.args = {
  children: '텍스트',
};
