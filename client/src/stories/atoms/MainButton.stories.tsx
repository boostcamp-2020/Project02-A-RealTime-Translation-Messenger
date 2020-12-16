import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { MainButton, ButtonPropsType } from '../../components/atoms/buttons/MainButton';

export default {
  title: 'pupagoAtom/MainButton',
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

export const None = Template.bind({});
None.args = {};
