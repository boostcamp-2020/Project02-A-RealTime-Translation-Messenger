import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { RoomCreation, RoomCreationPropsType } from '../../components/molecules/roomCreationPage/RoomCreation';

export default {
  title: 'pupagoMolecule/RoomCreation',
  component: RoomCreation,
} as Meta;

const Template: Story<RoomCreationPropsType> = (args) => <RoomCreation {...args} />;

export const Default = Template.bind({});
Default.args = {
  TypedWordCount: 0,
  MaxWordCount: 30,
  privateSelected: true,
};
