import React, { useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

import VoiceRecognitionModal from '../../molecules/chatRoomPage/VoiceRecognitionModal';
import useChatInput from '../../../hooks/useChatInput';
import useUser from '../../../hooks/useUser';
import LangCode from '../../../@types/langCode';
import Timer from '../../../@types/timer';

export type VoiceRecognitionPropsType = {
  onClickBackground: () => void;
};

function VoiceRecognition({ onClickBackground }: VoiceRecognitionPropsType) {
  const { transcript, resetTranscript } = useSpeechRecognition();
  const { onSetChatInput } = useChatInput();
  const { languageData } = useUser();

  useEffect(() => {
    SpeechRecognition.startListening({
      continuous: true,
      language: languageData === LangCode.KOREAN ? 'ko-KR' : 'en-US',
    });
    return () => {
      resetTranscript();
      SpeechRecognition.stopListening();
    };
  }, []);

  useEffect(() => {
    let voiceTimer: number = 0;

    const createTimer = (time: number) => {
      return (voiceTimer = setTimeout(() => {
        SpeechRecognition.stopListening();
        resetTranscript();
        onClickBackground();
      }, time));
    };

    if (transcript !== '') {
      voiceTimer = createTimer(Timer.TRANSCRIPT_EXISTS);
      onSetChatInput(transcript);
    } else {
      voiceTimer = createTimer(Timer.NO_TRANSCRIPT);
    }
    return () => {
      clearTimeout(voiceTimer);
    };
  }, [transcript]);

  return (
    <div>
      <VoiceRecognitionModal
        onClickBackground={() => {
          SpeechRecognition.stopListening();
          resetTranscript();
          onClickBackground();
        }}
      />
    </div>
  );
}

export default VoiceRecognition;
