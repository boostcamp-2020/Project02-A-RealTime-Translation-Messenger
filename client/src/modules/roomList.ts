import { createAsyncThunk, PayloadAction, createSlice } from '@reduxjs/toolkit';

import { RoomListType } from '../@types/types';
import api from '../assets/api';

const name = 'roomList';

const getRoomList = createAsyncThunk(`${name}/getRoomList`, async (_, { rejectWithValue }) => {
  try {
    return (await api.getRoomList()).data.roomList;
  } catch (e) {
    return rejectWithValue(e);
  }
});

type RoomListInitialStateType = {
  roomList: {
    data: RoomListType[] | null;
    loading: boolean;
    error: Error | null;
  };
};

const initialState: RoomListInitialStateType = {
  roomList: {
    data: null,
    loading: false,
    error: null,
  },
};

const roomList = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRoomList.pending.type, (state) => {
        state.roomList.loading = true;
      })
      .addCase(getRoomList.fulfilled.type, (state, action: PayloadAction<RoomListType[]>) => {
        state.roomList.loading = false;
        state.roomList.data = action.payload;
      })
      .addCase(getRoomList.rejected.type, (state, action: PayloadAction<Error>) => {
        state.roomList.loading = false;
        state.roomList.error = action.payload;
      });
  },
});

export default roomList.reducer;
export { getRoomList };
