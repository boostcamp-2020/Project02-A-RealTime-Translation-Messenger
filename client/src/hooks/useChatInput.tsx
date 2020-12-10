import { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '../modules';
import { getTranslatedText, setChatInput, getTextOrigin } from '../modules/chatInput';

function useTranslate() {
  const { chatInput, translation, origin } = useSelector((state: RootState) => state.chatInput);
  const dispatch = useDispatch();

  useEffect(() => {
    const handler = setTimeout(() => {
      dispatch(getTranslatedText({ text: chatInput.data, currentLanguage: translation.data.language }));
    }, 200);

    return () => {
      clearTimeout(handler);
    };
  }, [chatInput.data]);

  const onGetTranslatedText = useCallback(
    (text: string) => dispatch(getTranslatedText({ text, currentLanguage: translation.data.language })),
    [dispatch],
  );

  const onSetChatInput = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      dispatch(setChatInput(e.target.value));
      dispatch(getTextOrigin(e.target.value));
    },
    [dispatch],
  );

  return {
    chatInputData: chatInput.data,
    translationData: translation.data,
    translationLoading: translation.loading,
    translationError: translation.error,
    originData: origin.data,
    originLoading: origin.loading,
    originError: origin.error,
    onGetTranslatedText,
    onSetChatInput,
  };
}

export default useTranslate;
