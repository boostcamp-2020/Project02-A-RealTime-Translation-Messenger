import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import ChatInputMolecule from '../../molecules/chatRoomPage/ChatInput';
import useChatInput from '../../../hooks/useChatInput';
import ChatTranslationBox from '../../atoms/boxes/ChatTranslationBox';
import VoiceRecognitionModal from '../../molecules/chatRoomPage/VoiceRecognitionModal';

const Wrapper = styled.div`
  position: relative;
  display: flex;
`;

const VoiceWrapper = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function ChatInput() {
  const [voice, setVoice] = useState(false);

  const { chatInputData, translationData, onSetChatInput, onGetTranslatedText } = useChatInput();

  useEffect(() => {
    onGetTranslatedText(chatInputData);
  }, [chatInputData]);

  return (
    <Wrapper>
      <ChatInputMolecule
        value={chatInputData}
        onChangeInput={onSetChatInput}
        clickMicFunc={() => {
          setVoice(true);
        }}
      />
      <ChatTranslationBox value={translationData.translationText} />
      {voice && (
        <VoiceWrapper>
          <VoiceRecognitionModal
            onClickBackground={() => {
              setVoice(false);
            }}
          />
        </VoiceWrapper>
      )}
    </Wrapper>
  );
}

export default ChatInput;
