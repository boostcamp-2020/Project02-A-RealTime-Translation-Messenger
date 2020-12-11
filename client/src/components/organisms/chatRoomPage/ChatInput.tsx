import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import ChatInputMolecule from '../../molecules/chatRoomPage/ChatInput';
import useChatInput from '../../../hooks/useChatInput';
import ChatTranslationBox from '../../atoms/boxes/ChatTranslationBox';
import VoiceRecognitionModal from '../../molecules/chatRoomPage/VoiceRecognitionModal';
import useUser from '../../../hooks/useUser';

// type ChatInputPropsType = {
//   socket: SocketIOClient.Socket;
// };

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

  const { chatInputData, translationData, translationLoading, onSetChatInput, onGetTranslatedText } = useChatInput();

  return (
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
          socketData.emit('send chat', sendingChat);
          // 필드 리셋 - 인풋 초기화
        }}
      />
      <ChatTranslationBox value={getPapagoStyleText(translationLoading, translationData.translationText)} />
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
