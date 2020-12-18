import React from 'react';
import styled from 'styled-components';

import ChatModalBackground from '../../atoms/boxes/ChatModalBackground';
import VoiceRecognition from '../../atoms/resources/VoiceRecognition';

export type VoiceRecognitionModalPropsType = {
  onClickBackground?: () => void;
};

const VoiceRecognitionModalWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const VoiceRecognitionWrapper = styled.div`
  position: absolute;
  left: 520px;
  top: 240px;
`;

function VoiceRecognitionModal({ onClickBackground }: VoiceRecognitionModalPropsType) {
  return (
    <VoiceRecognitionModalWrapper>
      <ChatModalBackground onClick={onClickBackground} />
      <VoiceRecognitionWrapper>
        <VoiceRecognition />
      </VoiceRecognitionWrapper>
    </VoiceRecognitionModalWrapper>
  );
}

export default VoiceRecognitionModal;
