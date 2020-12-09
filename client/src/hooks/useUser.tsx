import { useSelector, useDispatch } from 'react-redux';
import { useCallback } from 'react';

import { RootState } from '../modules';
import { setUser } from '../modules/user';
import { UserStateType } from '../@types/types';

export default function useUser() {
  const { data } = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch();

  const onSetUser = useCallback((user: UserStateType) => dispatch(setUser(user)), [dispatch]);

  return {
    data,
    onSetUser,
  };
}
