import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { LanguageTag, LanguageTagPropsType } from '../components/atoms/resources/LanguageTag';

export default {
  title: 'pupago/LanguageTag',
  component: LanguageTag,
} as Meta;

const Template: Story<LanguageTagPropsType> = (args) => <LanguageTag {...args} />;

export const Active = Template.bind({});
Active.args = {
  language: 'Korean',
  isMe: true,
};

export const Disabled = Template.bind({});
Disabled.args = {
  language: 'English',
  isMe: false,
};
