import { createAsyncThunk, PayloadAction, createSlice } from '@reduxjs/toolkit';

import api from '../assets/api';
import { CreatedRoomType, CreatingRoomType, JoiningRoomType } from '../@types/types';
import { history } from '..';

const name = 'room';

const createRoom = createAsyncThunk(
  `${name}/createRoom`,
  async ({ title, isPrivate }: CreatingRoomType, { rejectWithValue }) => {
    try {
      const response = (await api.createRoom(title, isPrivate)).data;
      history.push('/chat');
      return response;
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);

const joinRoom = createAsyncThunk(
  `${name}/joinRoom`,
  async ({ roomCode, isPrivate }: JoiningRoomType, { rejectWithValue }) => {
    try {
      const response = (await api.joinRoom(roomCode, isPrivate)).data;
      history.push('/chat');
      return response;
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
      state.room.data.isPrivate = action.payload;
    },
    changeRoomCode: (state, action: PayloadAction<string>) => {
      state.room.data.roomCode = action.payload;
    },
    resetRoomState: (state) => {
      state.room.data.title = '';
      state.room.data.isPrivate = 'false';
      state.room.data.roomCode = '';
      state.room.loading = false;
      state.room.error = null;
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
export const changeRoomCode = room.actions.changeRoomCode;
export const resetRoomState = room.actions.resetRoomState;
export { createRoom, joinRoom };
