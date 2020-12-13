import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { CodeBox, CodeBoxPropsType } from '../../components/atoms/boxes/CodeBox';

export default {
  title: 'pupagoAtom/CodeBox',
  component: CodeBox,
} as Meta;

const Template: Story<CodeBoxPropsType> = (args) => <CodeBox {...args} />;

export const Active = Template.bind({});
Active.args = {
  isEntered: true,
  children: '9',
};

export const Disabled = Template.bind({});
Disabled.args = {
  isEntered: false,
};
