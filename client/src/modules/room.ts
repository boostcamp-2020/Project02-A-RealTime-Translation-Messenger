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
      roomCode: null,
      title: '',
      isPrivate: 'false',
    },
    loading: false,
    error: null,
  },
};

const room = createSlice({
  name,
  initialState,
  reducers: {
    setRoomTitle: (state, action: PayloadAction<string>) => {
      state.room.data.title = action.payload;
    },
    setIsPrivate: (state, action: PayloadAction<'true' | 'false'>) => {
      console.log(action.payload);
      state.room.data.isPrivate = action.payload;
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

export default room.reducer;
export const setRoomTitle = room.actions.setRoomTitle;
export const setIsPrivate = room.actions.setIsPrivate;
export { createRoom, joinRoom };
