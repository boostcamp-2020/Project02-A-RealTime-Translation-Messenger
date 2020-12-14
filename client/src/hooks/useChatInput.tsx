import { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CharacterLimit from '../@types/characterLimit';

import { RootState } from '../modules';
import { getTranslatedText, setChatInput, setTranslation, resetChatInput, setCycle } from '../modules/chatInput';

function useTranslate() {
  const { chatInput, translation, cycle } = useSelector((state: RootState) => state.chatInput);
  const dispatch = useDispatch();

  useEffect(() => {
    if (chatInput.data.trim().length === 0) {
      dispatch(setTranslation(''));
      return;
    }
    dispatch(setCycle('PROCESS'));
    const handler = setTimeout(() => {
      dispatch(getTranslatedText({ text: chatInput.data, origin: translation.data.origin }));
    }, 200);

    return () => {
      clearTimeout(handler);
    };
  }, [chatInput.data]);

  useEffect(() => {
    if (chatInput.data.length === 0) {
      dispatch(setTranslation(''));
    }
  }, [translation.data]);

  const onGetTranslatedText = useCallback(
    (text: string) => dispatch(getTranslatedText({ text, origin: translation.data.origin })),
    [dispatch],
  );

  const onSetChatInput = useCallback(
    (text: string) => {
      dispatch(setChatInput(text.substr(0, CharacterLimit.CHAT_INPUT)));
    },
    [dispatch],
  );

  const onResetChatInput = useCallback(() => {
    dispatch(resetChatInput());
  }, [dispatch]);

  return {
    chatInputData: chatInput.data,
    translationData: translation.data,
    cycleData: cycle.data,
    translationLoading: translation.loading,
    translationError: translation.error,
    onGetTranslatedText,
    onSetChatInput,
    onResetChatInput,
  };
}

export default useTranslate;
