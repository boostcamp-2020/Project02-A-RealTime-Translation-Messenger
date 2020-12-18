import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import RefreshButton, { RefreshButtonTypes } from '../../components/atoms/buttons/RefreshButton';

export default {
  title: 'pupagoAtom/RefreshButton',
  component: RefreshButton,
} as Meta;

const Template: Story<RefreshButtonTypes> = (args) => <RefreshButton {...args} />;

export const Default = Template.bind({});
