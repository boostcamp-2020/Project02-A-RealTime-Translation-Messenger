import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import LanguageSelection, {
  LanguageSelectionPropsType,
} from '../../components/molecules/userInfoPage/LanguageSelection';

export default {
  title: 'pupagoMolecule/LanguageSelection',
  component: LanguageSelection,
} as Meta;

const Template: Story<LanguageSelectionPropsType> = (args) => <LanguageSelection {...args} />;

export const unSelected = Template.bind({});
unSelected.args = {};

export const selectedKorean = Template.bind({});
selectedKorean.args = {
  selectedKorean: false,
};
