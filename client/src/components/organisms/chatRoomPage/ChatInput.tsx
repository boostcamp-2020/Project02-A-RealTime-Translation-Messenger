import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import ChatInputMolecule from '../../molecules/chatRoomPage/ChatInput';
import useChatInput from '../../../hooks/useChatInput';
import ChatTranslationBox from '../../atoms/boxes/ChatTranslationBox';
import VoiceRecognitionModal from '../../molecules/chatRoomPage/VoiceRecognitionModal';

type ChatInputPropsType = {
  socket: SocketIOClient.Socket;
};

const Wrapper = styled.div`
  position: relative;
  display: flex;
  border-bottom-left-radius: 30px;
  width: 1000px;
  height: 128px;
  background-color: white;
`;

const VoiceWrapper = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function ChatInput({ socket }: ChatInputPropsType) {
  const [voice, setVoice] = useState(false);

  const { chatInputData, translationData, translationLoading, onSetChatInput, onGetTranslatedText } = useChatInput();

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
        clickSendFunc={() => {
          if (translationLoading) return;
          const sendingChat = {
            Korean: '',
            English: '',
            origin: translationData.origin,
          };
          if (translationData.origin === 'Korean') {
            sendingChat.Korean = chatInputData;
            sendingChat.English = translationData.translationText;
          } else if (translationData.origin === 'English') {
            sendingChat.Korean = translationData.translationText;
            sendingChat.English = chatInputData;
          }
          socket.emit('send chat', sendingChat);
          // 필드 리셋 - 인풋 초기화
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
