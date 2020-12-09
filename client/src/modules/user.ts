import { createAsyncThunk, PayloadAction, createSlice } from '@reduxjs/toolkit';

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
    data: 'Korean' | 'English';
  };
  imageLink: {
    data: string | null;
    loading: boolean;
    error: Error | null;
  };
};

const initialState: InitialStateType = {
  nickname: {
    data: '',
  },
  language: {
    data: 'Korean',
  },
  imageLink: {
    data: null,
    loading: false,
    error: null,
  },
};

const user = createSlice({
  name,
  initialState,
  reducers: {
    setNickname: (state, action: PayloadAction<string>) => {
      state.nickname.data = action.payload;
    },
    setLanguage: (state, action: PayloadAction<'Korean' | 'English'>) => {
      state.language.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRandomProfileImage.pending.type, (state) => {
        state.imageLink.loading = true;
      })
      .addCase(getRandomProfileImage.fulfilled.type, (state, action: PayloadAction<'Korean' | 'English'>) => {
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
export { getRandomProfileImage };
