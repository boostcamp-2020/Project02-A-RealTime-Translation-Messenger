import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../modules';
import { getRoomList } from '../modules/roomList';
import { useCallback } from 'react';

export default function useRoomList() {
  const { data, loading, error } = useSelector((state: RootState) => state.roomList.roomList);
  const dispatch = useDispatch();

  const onGetRoomList = useCallback(() => dispatch(getRoomList()), [dispatch]);

  return {
    data,
    loading,
    error,
    onGetRoomList,
  };
}
