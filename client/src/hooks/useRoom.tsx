import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../modules';
import { createRoom, joinRoom } from '../modules/room';
import { useCallback } from 'react';

export default function useRoom() {
  const { data, loading, error } = useSelector((state: RootState) => state.room.room);
  const dispatch = useDispatch();

  const onCreateRoom = useCallback(
    ({ title, isPrivate }: { title: string; isPrivate: 'true' | 'false' }) =>
      dispatch(createRoom({ title, isPrivate })),
    [dispatch],
  );

  return {
    data,
    loading,
    error,
    onCreateRoom,
  };
}
