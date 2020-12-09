import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../modules';
import { stackChats } from '../modules/chat';
import { useCallback } from 'react';

import { ChatLogsType } from '../@types/types';

export default function useChat() {
  const { data } = useSelector((state: RootState) => state.chat.chatLogs);
  const dispatch = useDispatch();

  const onStackChats = useCallback((chatLogs: ChatLogsType) => dispatch(stackChats(chatLogs)), [dispatch]);

  return {
    data,
    onStackChats,
  };
}
