import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import SideBarBox, { SideBarBoxpropsType } from '../../components/atoms/boxes/SideBarBox';

export default {
  title: 'pupagoAtom/SideBarBox',
  component: SideBarBox,
} as Meta;

const Template: Story<SideBarBoxpropsType> = (args) => <SideBarBox {...args} />;

export const Appearance = Template.bind({});
Appearance.args = {};
