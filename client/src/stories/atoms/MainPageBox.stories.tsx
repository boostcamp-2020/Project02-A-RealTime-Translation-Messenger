import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { MainPageBox, MainPageBoxPropsType } from '../../components/atoms/boxes/MainPageBox';

export default {
  title: 'pupagoAtom/MainPageBox',
  component: MainPageBox,
} as Meta;

const Template: Story<MainPageBoxPropsType> = (args) => <MainPageBox {...args} />;

export const Active = Template.bind({});
