import { useSelector, useDispatch } from 'react-redux';
import { useCallback } from 'react';

import { RootState } from '../modules';
import { setNickname, setLanguage, setSocketId, getRandomProfileImage } from '../modules/user';

export default function useUser() {
  const { nickname, language, socketId, imageLink } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const onSetNickname = useCallback(
    (nickname: string) => {
      dispatch(setNickname(nickname));
    },
    [dispatch],
  );

  const onSetLanguage = useCallback(
    (language: 'Korean' | 'English') => {
      dispatch(setLanguage(language));
    },
    [dispatch],
  );

  const onSetSocketId = useCallback(
    (socketId: string) => {
      dispatch(setSocketId(socketId));
    },
    [dispatch],
  );

  const onGetRandomProfileImage = useCallback(() => {
    dispatch(getRandomProfileImage());
  }, [dispatch]);

  return {
    nicknameData: nickname.data,
    languageData: language.data,
    socketIdData: socketId.data,
    imageLinkData: imageLink.data,
    imageLinkLoading: imageLink.loading,
    imageLinkError: imageLink.error,
    onSetNickname,
    onSetLanguage,
    onSetSocketId,
    onGetRandomProfileImage,
  };
}
