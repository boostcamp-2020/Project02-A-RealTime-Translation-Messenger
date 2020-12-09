import { useSelector, useDispatch } from 'react-redux';
import { useCallback } from 'react';

import { RootState } from '../modules';
import { setNickname, setLanguage, getRandomProfileImage } from '../modules/user';

export default function useUser() {
  const { nickname, language, imageLink } = useSelector((state: RootState) => state.user);
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

  const onGetRandomProfileImage = useCallback(() => {
    dispatch(getRandomProfileImage());
  }, [dispatch]);

  return {
    nicknameData: nickname.data,
    languageData: language.data,
    imageLinkData: imageLink.data,
    imageLinkLoading: imageLink.loading,
    imageLinkError: imageLink.error,
    onSetNickname,
    onSetLanguage,
    onGetRandomProfileImage,
  };
}
