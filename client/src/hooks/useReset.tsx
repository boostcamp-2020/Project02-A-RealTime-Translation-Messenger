import React, { useCallback } from 'react';
import useChat from './useChat';
import useRoom from './useRoom';
import useChatInput from './useChatInput';
import useNavigation from './useNavigation';
import { useDispatch } from 'react-redux';
import useParticipantsList from './useParticipantsList';
import useUser from './useUser';

function useReset() {
  const { onResetChats } = useChat();
  const { onResetParticipantsList } = useParticipantsList();
  const { onResetRoomState } = useRoom();
  const { onResetChatInput } = useChatInput();
  const { onResetSocketId, onResetSocket, socketData } = useUser();
  const dispatch = useDispatch();

  const onReset = useCallback(() => {
    onResetSocketId();
    onResetChats();
    onResetChatInput();
    onResetParticipantsList();
    onResetRoomState();
    socketData?.disconnect();
    onResetSocket();
  }, [dispatch]);

  return {
    onReset,
  };
}

export default useReset;
