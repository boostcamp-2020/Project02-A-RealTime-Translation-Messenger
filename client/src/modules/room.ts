import { createAsyncThunk, PayloadAction, createSlice } from '@reduxjs/toolkit';

import api from '../assets/api';
import { CreatedRoomType } from '../@types/types';

const name = 'room';

const createRoom = createAsyncThunk(
  `${name}/createRoom`,
  async ({ title, isPrivate }: { title: string; isPrivate: 'true' | 'false' }, { rejectWithValue }) => {
    try {
      return (await api.createRoom(title, isPrivate)).data;
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);

const joinRoom = createAsyncThunk(
  `${name}/joinRoom`,
  async ({ roomCode, isPrivate }: { roomCode: string; isPrivate: 'true' | 'false' }, { rejectWithValue }) => {
    try {
      return (await api.joinRoom(roomCode, isPrivate)).data;
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);

type InitialStateType = {
  room: {
    data: CreatedRoomType;
    loading: boolean;
    error: Error | null;
  };
};

const initialState: InitialStateType = {
  room: {
    data: {
      roomCode: '',
      title: null,
      isPrivate: null,
    },
    loading: false,
    error: null,
  },
};

const roomList = createSlice({
  name,
  initialState,
  reducers: {
    changeRoomCode: (state, action: PayloadAction<string>) => {
      state.room.data.roomCode = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createRoom.pending.type, (state) => {
        state.room.loading = true;
      })
      .addCase(createRoom.fulfilled.type, (state, action: PayloadAction<CreatedRoomType>) => {
        state.room.loading = false;
        state.room.data = action.payload;
      })
      .addCase(createRoom.rejected.type, (state, action: PayloadAction<Error>) => {
        state.room.loading = false;
        state.room.error = action.payload;
      })
      .addCase(joinRoom.pending.type, (state) => {
        state.room.loading = true;
      })
      .addCase(joinRoom.fulfilled.type, (state, action: PayloadAction<CreatedRoomType>) => {
        state.room.loading = false;
        state.room.data = action.payload;
      })
      .addCase(joinRoom.rejected.type, (state, action: PayloadAction<Error>) => {
        state.room.loading = false;
        state.room.error = action.payload;
      });
  },
});

const changeRoomCode = roomList.actions.changeRoomCode;
export default roomList.reducer;
export { createRoom, joinRoom, changeRoomCode };
