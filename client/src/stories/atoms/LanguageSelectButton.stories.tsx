import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import {
  LanguageSelectButton,
  LanguageSelectButtonPropsType,
} from '../../components/atoms/buttons/LanguageSelectButton';
import LangCode from '../../@types/langCode';

export default {
  title: 'pupagoAtom/LanguageSelectButton',
  component: LanguageSelectButton,
} as Meta;

const Template: Story<LanguageSelectButtonPropsType> = (args) => <LanguageSelectButton {...args} />;

export const Selected = Template.bind({});
Selected.args = {
  selected: true,
  language: LangCode.KOREAN,
};

export const Disabled = Template.bind({});
Disabled.args = {
  selected: false,
  language: LangCode.ENGLISH,
};
