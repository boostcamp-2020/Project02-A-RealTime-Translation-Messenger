import React, { useState, useRef, useEffect } from 'react';
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

const getPapagoStyleText = (loading: boolean, data: string) => {
  if (loading) return `${data}...`;
  return data;
};

function ChatInput() {
  const [voice, setVoice] = useState(false);
  const { socketData } = useUser();

  const { chatInputData, translationData, translationLoading, onSetChatInput, cycleData } = useChatInput();

  const getSendingChat = () => ({
    Korean: translationData.origin === 'Korean' ? chatInputData : translationData.translationText,
    English: translationData.origin === 'English' ? chatInputData : translationData.translationText,
    origin: translationData.origin,
  });

  const sendingChat = useRef(getSendingChat());

  useEffect(() => {
    sendingChat.current = getSendingChat();
  }, [translationLoading]);

  const sendChatWhenEnter = () => {
    if (!socketData) return;
    if (translationData.translationText.length === 0) return;
    if (translationLoading) return;
    if (cycleData === 'PROCESS') return;

    socketData.emit('send chat', sendingChat.current);
    onSetChatInput('');
  };

  return (
    <>
      <Wrapper>
        <ChatInputMolecule
          value={chatInputData}
          onChangeInput={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
            const inputToReplace = e.target.value;

            if (inputToReplace[inputToReplace.length - 1] !== '\n') {
              onSetChatInput(e.target.value);
              return;
            }
            sendChatWhenEnter();
          }}
          clickMicFunc={() => {
            setVoice(true);
          }}
          clickSendFunc={() => {
            if (translationLoading || socketData === null) return;
            sendChatWhenEnter();
          }}
        />
        <ChatTranslationBox value={getPapagoStyleText(translationLoading, translationData.translationText)} />
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
