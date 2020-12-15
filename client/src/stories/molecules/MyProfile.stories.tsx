import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import MyProfile, { MyProfilePropsType } from '../../components/molecules/roomListPage/MyProfile';

export default {
  title: 'pupagoMolecule/MyProfile',
  component: MyProfile,
} as Meta;

const Template: Story<MyProfilePropsType> = (args) => <MyProfile {...args} />;

export const Korean = Template.bind({});
Korean.args = {
  image: `https://i.imgur.com/O3G3HwR.jpg`,
  language: LangCode.KOREAN,
  nickname: '닉네임',
};

export const English = Template.bind({});
English.args = {
  image: `https://i.imgur.com/O3G3HwR.jpg`,
  language: LangCode.ENGLISH,
  nickname: '열두글자확인을위한닉네임',
};
