import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import LanguageSelection, { LanguageSelectionPropsType } from '../../components/molecules/mainPage/LanguageSelection';

export default {
  title: 'pupagoMolecule/LanguageSelection',
  component: LanguageSelection,
} as Meta;

const Template: Story<LanguageSelectionPropsType> = (args) => <LanguageSelection {...args} />;

export const unSelected = Template.bind({});
unSelected.args = {
  children: '언어를 선택해주세요',
  selectedKorean: false,
  selectedEnglish: false,
};

export const selectedKorean = Template.bind({});
selectedKorean.args = {
  children: '언어를 선택해주세요',
  selectedKorean: true,
  selectedEnglish: false,
};
