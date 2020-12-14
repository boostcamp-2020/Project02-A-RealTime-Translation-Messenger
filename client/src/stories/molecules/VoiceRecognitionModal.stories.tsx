import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import VoiceRecognitionModal, {
  VoiceRecognitionModalPropsType,
} from '../../components/molecules/chatRoomPage/VoiceRecognitionModal';

export default {
  title: 'pupagoMolecule/VoiceRecognitionModal',
  component: VoiceRecognitionModal,
} as Meta;

const Template: Story<VoiceRecognitionModalPropsType> = (args) => <VoiceRecognitionModal {...args} />;

export const Default = Template.bind({});
