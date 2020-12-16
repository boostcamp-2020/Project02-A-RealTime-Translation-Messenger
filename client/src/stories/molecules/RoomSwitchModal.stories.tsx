import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { RoomSwitchModal } from '../../components/molecules/chatRoomPage/RoomSwitchModal';

export default {
  title: 'pupagoMolecule/RoomSwitchModal',
  component: RoomSwitchModal,
} as Meta;

const Template: Story = (args) => (
  <RoomSwitchModal
    onClickConfirm={() => {}}
    onClickCancel={() => {}}
    onClickBackground={() => {}}
    onClickClose={() => {}}
  />
);

export const Default = Template.bind({});
