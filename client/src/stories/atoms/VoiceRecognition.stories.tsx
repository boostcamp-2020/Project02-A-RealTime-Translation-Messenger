import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import VoiceRecognition from '../components/atoms/resources/VoiceRecognition';

export default {
  title: 'pupago/VoiceRecognition',
  component: VoiceRecognition,
} as Meta;

const Template: Story<any> = (args) => <VoiceRecognition {...args} />;

export const Active = Template.bind({});
Active.args = {};
