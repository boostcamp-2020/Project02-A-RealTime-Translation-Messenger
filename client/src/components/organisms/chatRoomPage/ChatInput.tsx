import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import ChatInputMolecule from '../../molecules/chatRoomPage/ChatInput';
import useChatInput from '../../../hooks/useChatInput';
import ChatTranslationBox from '../../atoms/boxes/ChatTranslationBox';
import VoiceRecognitionOrganism from '../../organisms/chatRoomPage/VoiceRecognition';
import useUser from '../../../hooks/useUser';

const Wrapper = styled.div`
  position: relative;
  display: flex;
  border-bottom-left-radius: 30px;
  padding: 24px;
  width: 1000px;
  height: 176px;
  background-color: white;
`;

const VoiceWrapper = styled.div`
  position: absolute;
  bottom: 0px;
  left: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function ChatInput() {
  const [voice, setVoice] = useState(false);
  const { socketData } = useUser();

  const { chatInputData, translationData, translationLoading, onSetChatInput, onGetTranslatedText } = useChatInput();

  useEffect(() => {
    onGetTranslatedText(chatInputData);
  }, [chatInputData]);

  return (
    <>
      <Wrapper>
     <ChatInputMolecule
        value={chatInputData}
        onChangeInput={onSetChatInput}
        clickMicFunc={() => {
          setVoice(true);
        }}
        clickSendFunc={() => {
          if (translationLoading || socketData === null) return;
          const sendingChat = {
            Korean: translationData.origin === 'Korean' ? chatInputData : translationData.translationText,
            English: translationData.origin === 'English' ? chatInputData : translationData.translationText,
            origin: translationData.origin,
          };
          socketData.emit('send chat', sendingChat);
          // 필드 리셋 - 인풋 초기화
        }}
      />
        <ChatTranslationBox value={translationData.translationText} />
      </Wrapper>

      {voice && (
        <VoiceWrapper>
          <VoiceRecognitionOrganism
            onClickBackground={() => {
              setVoice(false);
            }}
          />
        </VoiceWrapper>
      )}
    </>
  );
}

export default ChatInput;
