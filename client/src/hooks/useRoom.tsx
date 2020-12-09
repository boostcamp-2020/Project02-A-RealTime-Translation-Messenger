import { useSelector, useDispatch } from 'react-redux';
import { useCallback } from 'react';

import { RootState } from '../modules';
import { createRoom, joinRoom } from '../modules/room';

export default function useRoom() {
  const { data, loading, error } = useSelector((state: RootState) => state.room.room);
  const dispatch = useDispatch();

  const onCreateRoom = useCallback(
    ({ title, isPrivate }: { title: string; isPrivate: 'true' | 'false' }) =>
      dispatch(createRoom({ title, isPrivate })),
    [dispatch],
  );

  const onJoinRoom = useCallback(
    ({ roomCode, isPrivate }: { roomCode: string; isPrivate: 'true' | 'false' }) =>
      dispatch(joinRoom({ roomCode, isPrivate })),
    [dispatch],
  );

  return {
    data,
    loading,
    error,
    onCreateRoom,
    onJoinRoom,
  };
}
