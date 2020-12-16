import { createAsyncThunk, PayloadAction, createSlice } from '@reduxjs/toolkit';

import { RoomListType } from '../@types/types';
import api from '../assets/api';

const name = 'roomList';

const getRoomList = createAsyncThunk(`${name}/getRoomList`, async (_, { rejectWithValue }) => {
  try {
    const roomList = (await api.getRoomList()).data.roomList.sort((prev, next) => {
      return new Date(next.createdAt).getTime() - new Date(prev.createdAt).getTime();
    });
    return roomList;
  } catch (e) {
    return rejectWithValue(e);
  }
});

type InitialStateType = {
  roomList: {
    data: RoomListType[] | null;
    loading: boolean;
    error: Error | null;
  };
};

const initialState: InitialStateType = {
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
