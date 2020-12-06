import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { MainTitle } from '../../components/molecules/MainPage/MainTitle';

export default {
  title: 'pupagoMolecule/MainTitle',
  component: MainTitle,
} as Meta;

const Template: Story = (args) => <MainTitle {...args} />;

export const Default = Template.bind({});
