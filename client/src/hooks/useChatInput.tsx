import { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '../modules';
import { getTranslatedText, setChatInput } from '../modules/chatInput';

function useTranslate() {
  const { chatInput, translation } = useSelector((state: RootState) => state.chatInput);
  const dispatch = useDispatch();

  useEffect(() => {
    const handler = setTimeout(() => {
      dispatch(getTranslatedText({ text: chatInput.data, origin: translation.data.origin }));
    }, 200);

    return () => {
      clearTimeout(handler);
    };
  }, [chatInput.data]);

  const onGetTranslatedText = useCallback(
    (text: string) => dispatch(getTranslatedText({ text, origin: translation.data.origin })),
    [dispatch],
  );

  const onSetChatInput = useCallback(
    (text: string) => {
      dispatch(setChatInput(text));
    },
    [dispatch],
  );

  return {
    chatInputData: chatInput.data,
    translationData: translation.data,
    translationLoading: translation.loading,
    translationError: translation.error,
    onGetTranslatedText,
    onSetChatInput,
  };
}

export default useTranslate;
