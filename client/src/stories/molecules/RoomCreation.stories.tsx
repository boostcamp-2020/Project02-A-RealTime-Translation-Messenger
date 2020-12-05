import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { RoomCreation } from '../../components/molecules/RoomCreationPage/RoomCreation';

export default {
  title: 'pupagoMolecule/RoomCreation',
  component: RoomCreation,
} as Meta;

const Template: Story = (args) => <RoomCreation {...args} />;

export const Default = Template.bind({});
