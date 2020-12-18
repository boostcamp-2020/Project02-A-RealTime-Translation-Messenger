import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import RoomItem, { RoomItemPropsType } from '../../components/molecules/common/RoomItem';
import { Size } from '../../@types/types';

export default {
  title: 'pupagoMolecule/RoomItem',
  component: RoomItem,
} as Meta;

const Template: Story<RoomItemPropsType> = (args) => <RoomItem {...args} />;

export const Big = Template.bind({});
Big.args = {
  size: Size.BIG,
  createdAt: '몇 분 전 생성',
  participantCount: 4,
  roomCapacity: 8,
  title: '안녕',
};

export const Small = Template.bind({});
Small.args = {
  size: Size.SMALL,
  createdAt: '몇 분 전 생성',
  participantCount: 3,
  roomCapacity: 8,
  title: '영어로 대화할 사람을 구해요!',
};
