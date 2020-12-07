import { Dispatch } from 'redux';
import { RoomListType } from '../@types/types';
import api from '../assets/api';

// 액션 (OK)
const GET_ROOMLIST = 'roomList/GET_ROOMLIST' as const;
const GET_ROOMLIST_SUCCESS = 'roomList/GET_ROOMLIST_SUCCESS' as const;
const GET_ROOMLIST_FAIL = 'roomList/GET_ROOMLIST_FAIL' as const;

type RoomListAction =
  | { type: typeof GET_ROOMLIST }
  | { type: typeof GET_ROOMLIST_SUCCESS; payload: { roomList: RoomListType[] } }
  | { type: typeof GET_ROOMLIST_FAIL; payload: { error: Error } };

// 액션 생성 함수
export const getRoomList = () => async (dispatch: Dispatch) => {
  dispatch({ type: GET_ROOMLIST }); // 요청이 시작됨
  try {
    const roomList = (await api.getRoomList()).data;

    dispatch({
      type: GET_ROOMLIST_SUCCESS,
      payload: {
        roomList,
      },
    }); // 성공
  } catch (error) {
    dispatch({ type: GET_ROOMLIST_FAIL, payload: { error } }); // 실패
  }
};

export type RoomListInitialStateType = {
  roomList: RoomListType[] | null;
  loading: boolean;
  error: Error | null;
};
// 기본 State
const initialState: RoomListInitialStateType = {
  roomList: null,
  loading: false,
  error: null,
};

// 리듀서

const roomList = (state: RoomListInitialStateType = initialState, action: RoomListAction) => {
  switch (action.type) {
    case GET_ROOMLIST:
      return {
        ...state,
        loading: true,
      };
    case GET_ROOMLIST_SUCCESS:
      return {
        ...state,
        loading: false,
        roomList: action.payload.roomList,
      };
    case GET_ROOMLIST_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default roomList;
