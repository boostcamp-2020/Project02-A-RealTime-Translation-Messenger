import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import {
  LanguageSelectButton,
  LanguageSelectButtonPropsType,
} from '../../components/atoms/buttons/LanguageSelectButton';

export default {
  title: 'pupagoAtom/LanguageSelectButton',
  component: LanguageSelectButton,
} as Meta;

const Template: Story<LanguageSelectButtonPropsType> = (args) => <LanguageSelectButton {...args} />;

export const Selected = Template.bind({});
Selected.args = {
  selected: true,
  language: 'Korean',
};

export const Disabled = Template.bind({});
Disabled.args = {
  selected: false,
  language: 'English',
};
