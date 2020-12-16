import React from 'react';
import styled from 'styled-components';
import { MicFill } from '@styled-icons/bootstrap';

import Palette from '../../../@types/Palette';

const Wrapper = styled.div`
  position: relative;

  @keyframes bigCircle {
    0% {
      transform: scale(0.75);
    }
    50% {
      transform: scale(0.8);
    }
    60% {
      transform: scale(0.85);
    }
    70% {
      transform: scale(0.9);
    }
    80% {
      transform: scale(0.95);
    }
    100% {
      transform: scale(1);
    }
  }

  @keyframes middleCircle {
    0% {
      transform: scale(0.6);
    }
    50% {
      transform: scale(0.65);
    }
    60% {
      transform: scale(0.7);
    }
    80% {
      transform: scale(0.75);
    }
    100% {
      transform: scale(0.8);
    }
  }
`;

const BigCircle = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  width: 240px;
  height: 240px;
  border-radius: 50%;
  background-color: rgba(92, 167, 228, 0.6);
  opacity: 1;
  animation: bigCircle 0.8s linear infinite;
  animation-direction: alternate;
`;

const MiddleCircle = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  width: 240px;
  height: 240px;
  border-radius: 50%;
  background-color: rgba(92, 167, 228, 0.8);
  opacity: 1;
  animation: middleCircle 0.8s linear infinite;
  animation-direction: alternate;
`;

const SmallCircle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 60px;
  left: 60px;
  z-index: 3;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-color: white;
  opacity: 1;
  animation: none;
`;

const MicIcon = styled(MicFill)`
  width: 70px;
  height: 95px;
  color: ${Palette.PUPAGO_BLUE};
`;

function VoiceRecognition() {
  return (
    <Wrapper>
      <BigCircle />
      <MiddleCircle />
      <SmallCircle>
        <MicIcon />
      </SmallCircle>
    </Wrapper>
  );
}

export default VoiceRecognition;
