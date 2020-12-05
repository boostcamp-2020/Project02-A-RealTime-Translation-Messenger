import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import SideBar, { SideBarpropsType } from '../../components/atoms/boxes/SideBar';

export default {
  title: 'pupagoAtom/SideBar',
  component: SideBar,
} as Meta;

const Template: Story<SideBarpropsType> = (args) => <SideBar {...args} />;

export const Appearance = Template.bind({});
Appearance.args = {};
