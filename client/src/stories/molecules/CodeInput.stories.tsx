import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import CodeInput, { CodeInputPropsType } from '../../components/molecules/codeInputPage/CodeInput';

export default {
  title: 'pupagoMolecule/CodeInput',
  component: CodeInput,
} as Meta;

const Template: Story<CodeInputPropsType> = (args) => <CodeInput {...args} />;

export const CodeInputExample = Template.bind({});
CodeInputExample.args = {
  roomCode: {
    value: 'A33D',
    valid: true,
  },
};

export const CodeNotValidExample = Template.bind({});
CodeNotValidExample.args = {
  roomCode: {
    value: 'A33D',
    valid: false,
  },
};
