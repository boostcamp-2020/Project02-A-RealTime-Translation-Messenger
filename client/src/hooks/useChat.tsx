import { useSelector, useDispatch } from 'react-redux';
import { useCallback } from 'react';

import { RootState } from '../modules';
import { stackChats, resetChats } from '../modules/chat';
import { ChatLogsType, ParticipantsUpdateType } from '../@types/types';

export default function useChat() {
  const { data } = useSelector((state: RootState) => state.chat.chatLogs);
  const dispatch = useDispatch();

  const onStackChats = useCallback(
    (chatLogs: ChatLogsType | ParticipantsUpdateType) => dispatch(stackChats(chatLogs)),
    [dispatch],
  );

  const onResetChats = useCallback(() => dispatch(resetChats()), [dispatch]);

  return {
    data,
    onStackChats,
    onResetChats,
  };
}
