import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import { MainButton, ButtonPropsType } from '../components/MainButton';

export default {
  title: 'pupago/MainButton',
  component: MainButton,
} as Meta;

const Template: Story<ButtonPropsType> = (args) => <MainButton {...args} />;

export const Active = Template.bind({});
Active.args = {
  disabled: false,
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};
