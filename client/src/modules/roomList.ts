import { createAsyncThunk, PayloadAction, createSlice } from '@reduxjs/toolkit';

import { RoomListType } from '../@types/types';
import api from '../assets/api';

const name = 'roomList';

export const getRoomList = createAsyncThunk(`${name}/getRoomList`, async (_, { rejectWithValue }) => {
  try {
    return (await api.getRoomList()).data;
  } catch (e) {
    return rejectWithValue(e);
  }
});

type RoomListInitialStateType = {
  data: {
    roomList: RoomListType[];
  } | null;
  loading: boolean;
  error: Error | null;
};

const initialState: RoomListInitialStateType = {
  data: null,
  loading: false,
  error: null,
};

const roomList = createSlice({
  name,
  initialState,
  reducers: {
    clearRoom: (state) => {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRoomList.pending.type, (state) => {
        state.loading = true;
      })
      .addCase(getRoomList.fulfilled.type, (state, action: PayloadAction<{ roomList: RoomListType[] }>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getRoomList.rejected.type, (state, action: PayloadAction<Error>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default roomList.reducer;
export const clearRoom = roomList.actions.clearRoom;
