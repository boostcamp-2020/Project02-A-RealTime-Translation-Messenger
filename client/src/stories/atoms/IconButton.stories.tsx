import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import IconButton, { IconButtonPropsType } from '../../components/atoms/buttons/IconButton';
import Palette from '../../@types/Palette';
import { IconType } from '../../@types/types';

export default {
  title: 'pupagoAtom/IconButton',
  component: IconButton,
} as Meta;

const Template: Story<IconButtonPropsType> = (args) => <IconButton {...args} />;

export const Edit = Template.bind({});
Edit.args = {
  iconType: IconType.EDIT,
};

export const ArrowBack = Template.bind({});
ArrowBack.args = {
  iconType: IconType.ARROW_BACK,
};

export const Send = Template.bind({});
Send.args = {
  iconType: IconType.SEND,
  color: Palette.PUPAGO_BLUE,
};

export const Mic = Template.bind({});
Mic.args = {
  iconType: IconType.MIC,
  color: Palette.PUPAGO_BLUE,
};

export const Leave = Template.bind({});
Leave.args = {
  iconType: IconType.LEAVE,
  color: Palette.PUPAGO_BLUE,
};

export const Close = Template.bind({});
Close.args = {
  iconType: IconType.CLOSE,
  color: Palette.DARK_GREY,
};
