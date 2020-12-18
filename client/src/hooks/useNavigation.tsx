import { useSelector, useDispatch } from 'react-redux';
import { useCallback } from 'react';

import { RootState } from '../modules';
import { setNavigation } from '../modules/navigation';
import MainPageNavigation from '../@types/mainPageNavigation';

export default function useNavigation() {
  const { data } = useSelector((state: RootState) => state.navigation.navigation);
  const dispatch = useDispatch();

  const onSetNavigation = useCallback(
    (destination: MainPageNavigation) => {
      dispatch(setNavigation(destination));
    },
    [dispatch],
  );

  return {
    navigation: data,
    onSetNavigation,
  };
}
