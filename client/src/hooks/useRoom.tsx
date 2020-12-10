import { useSelector, useDispatch } from 'react-redux';
import { useCallback } from 'react';

import { RootState } from '../modules';
import { setRoomTitle, setIsPrivate, createRoom, joinRoom, changeRoomCode, resetRoomState } from '../modules/room';

export default function useRoom() {
  const { data, loading, error } = useSelector((state: RootState) => state.room.room);
  const dispatch = useDispatch();

  const onSetRoomTitle = useCallback((title: string) => dispatch(setRoomTitle(title)), [dispatch]);

  const onSetIsPrivate = useCallback((isPrivate: 'true' | 'false') => dispatch(setIsPrivate(isPrivate)), [dispatch]);

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

  const onChangeRoomCode = useCallback(
    (roomCode: string) => {
      dispatch(changeRoomCode(roomCode));
    },
    [dispatch],
  );

  const onResetRoomState = useCallback(() => {
    dispatch(resetRoomState());
  }, [dispatch]);

  return {
    data,
    loading,
    error,
    onSetRoomTitle,
    onSetIsPrivate,
    onCreateRoom,
    onJoinRoom,
    onChangeRoomCode,
    onResetRoomState,
  };
}
