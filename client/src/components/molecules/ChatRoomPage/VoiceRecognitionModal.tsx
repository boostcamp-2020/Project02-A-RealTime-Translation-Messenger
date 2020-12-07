import React from 'react';
import styled from 'styled-components';

import ChatModalBackground from '../../atoms/boxes/ChatModalBackground';
import VoiceRecognition from '../../atoms/resources/VoiceRecognition';

export type VoiceRecognitionModalPropsType = {
  onClickBackground?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

const VoiceRecognitionWrapper = styled.div`
  position: absolute;
  left: 520px;
  top: 240px;
`;

export const VoiceRecognitionModal = ({ onClickBackground }: VoiceRecognitionModalPropsType) => {
  return (
    <div>
      <ChatModalBackground onClick={onClickBackground} />
      <VoiceRecognitionWrapper>
        <VoiceRecognition />
      </VoiceRecognitionWrapper>
    </div>
  );
};

export default VoiceRecognitionModal;
