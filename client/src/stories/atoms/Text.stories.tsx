import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import Text, { TextPropsType } from '../../components/atoms/texts/Text';

export default {
  title: 'pupagoAtom/Text',
  component: Text,
} as Meta;

const Template: Story<TextPropsType> = (args) => <Text {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  children: '텍스트',
};

export const BoldText = Template.bind({});
BoldText.args = {
  children: '텍스트',
  weight: 'bold',
};

export const BigText = Template.bind({});
BigText.args = {
  children: '텍스트',
  size: 100,
};

export const OtherColor = Template.bind({});
OtherColor.args = {
  children: '텍스트',
  color: 'red',
};
