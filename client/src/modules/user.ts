import { createAsyncThunk, PayloadAction, createSlice } from '@reduxjs/toolkit';

import LangCode from '../@types/langCode';
import api from '../assets/api';

const name = 'user';

const getRandomProfileImage = createAsyncThunk(`${name}/getRandomProfileImage`, async (_, { rejectWithValue }) => {
  try {
    return (await api.getRandomProfileImage()).data.imageLink;
  } catch (e) {
    return rejectWithValue(e);
  }
});

type InitialStateType = {
  nickname: {
    data: string;
  };
  language: {
    data: LangCode;
  };
  imageLink: {
    data: string | null;
    loading: boolean;
    error: Error | null;
  };
  socket: {
    data: SocketIOClient.Socket | null;
  };
  socketId: {
    data: string | null;
  };
};

const initialState: InitialStateType = {
  nickname: {
    data: '',
  },
  language: {
    data: LangCode.KOREAN,
  },
  imageLink: {
    data: null,
    loading: false,
    error: null,
  },
  socket: {
    data: null,
  },
  socketId: {
    data: null,
  },
};

const user = createSlice({
  name,
  initialState,
  reducers: {
    setNickname: (state, action: PayloadAction<string>) => {
      state.nickname.data = action.payload;
    },
    setLanguage: (state, action: PayloadAction<LangCode>) => {
      state.language.data = action.payload;
    },
    setSocket: (state, action: PayloadAction<SocketIOClient.Socket | null>) => {
      state.socket.data = action.payload;
    },
    setSocketId: (state, action: PayloadAction<string>) => {
      state.socketId.data = action.payload;
    },
    resetSocketId: (state) => {
      state.socketId.data = null;
    },
    resetSocket: (state) => {
      state.socket.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRandomProfileImage.pending.type, (state) => {
        state.imageLink.loading = true;
      })
      .addCase(getRandomProfileImage.fulfilled.type, (state, action: PayloadAction<LangCode>) => {
        state.imageLink.loading = false;
        state.imageLink.data = action.payload;
      })
      .addCase(getRandomProfileImage.rejected.type, (state, action: PayloadAction<Error>) => {
        state.imageLink.loading = false;
        state.imageLink.error = action.payload;
      });
  },
});

export default user.reducer;
export const setNickname = user.actions.setNickname;
export const setLanguage = user.actions.setLanguage;
export const setSocketId = user.actions.setSocketId;
export const setSocket = user.actions.setSocket;
export const resetSocketId = user.actions.resetSocketId;
export const resetSocket = user.actions.resetSocket;
export { getRandomProfileImage };
