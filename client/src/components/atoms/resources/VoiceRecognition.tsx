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
  width: 240px;
  height: 240px;

  top: 0;
  left: 0;

  z-index: 1;
  opacity: 1;

  background-color: rgba(92, 167, 228, 0.6);

  animation: bigCircle 0.8s linear infinite;
  animation-direction: alternate;
  border-radius: 50%;
`;

const MiddleCircle = styled.div`
  position: absolute;
  width: 240px;
  height: 240px;

  top: 0;
  left: 0;

  z-index: 2;
  opacity: 1;

  animation: middleCircle 0.8s linear infinite;
  animation-direction: alternate;
  border-radius: 50%;

  background-color: rgba(92, 167, 228, 0.8);
`;

const SmallCircle = styled.div`
  position: absolute;
  top: 60px;
  left: 60px;

  z-index: 3;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 120px;
  height: 120px;

  z-index: 3;
  opacity: 1;

  border-radius: 50%;

  background-color: white;

  animation: none;
`;

const MicIcon = styled(MicFill)`
  color: ${Palette.PUPAGO_BLUE};
  width: 70px;
  height: 95px;
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
