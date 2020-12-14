import { useSelector, useDispatch } from 'react-redux';
import { useCallback } from 'react';

import { RootState } from '../modules';
import { JoiningRoomType, CreatingRoomType } from '../@types/types';
import { setRoomTitle, setIsPrivate, createRoom, joinRoom, changeRoomCode, resetRoomState } from '../modules/room';

export default function useRoom() {
  const { data, loading, error } = useSelector((state: RootState) => state.room.room);
  const dispatch = useDispatch();

  const onSetRoomTitle = useCallback((title: string) => dispatch(setRoomTitle(title)), [dispatch]);

  const onSetIsPrivate = useCallback((isPrivate: 'true' | 'false') => dispatch(setIsPrivate(isPrivate)), [dispatch]);

  const onCreateRoom = useCallback((creatingRoom: CreatingRoomType) => dispatch(createRoom(creatingRoom)), [dispatch]);

  const onJoinRoom = useCallback((joiningRoom: JoiningRoomType) => dispatch(joinRoom(joiningRoom)), [dispatch]);

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
