import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { IconButton, IconButtonPropsType } from '../../components/atoms/buttons/IconButton';
import Palette from '../../@types/Palette';

export default {
  title: 'pupagoAtom/IconButton',
  component: IconButton,
} as Meta;

const Template: Story<IconButtonPropsType> = (args) => <IconButton {...args} />;

export const Edit = Template.bind({});
Edit.args = {
  iconType: 'Edit',
};

export const ArrowBack = Template.bind({});
ArrowBack.args = {
  iconType: 'ArrowBack',
};

export const Send = Template.bind({});
Send.args = {
  iconType: 'Send',
  color: Palette.PUPAGO_BLUE,
};

export const Mic = Template.bind({});
Mic.args = {
  iconType: 'Mic',
  color: Palette.PUPAGO_BLUE,
};

export const Leave = Template.bind({});
Leave.args = {
  iconType: 'Leave',
  color: Palette.PUPAGO_BLUE,
};

export const Close = Template.bind({});
Close.args = {
  iconType: 'Close',
  color: Palette.DARK_GREY,
};
