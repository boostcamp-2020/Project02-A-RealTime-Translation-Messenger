import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const name = 'user';

type UserStateType = {
  nickname: string | null;
  language: string | null;
  imageLink: string | null;
};

type InitialStateType = {
  user: {
    data: UserStateType;
  };
};

const initialState: InitialStateType = {
  user: {
    data: {
      nickname: null,
      language: null,
      imageLink: null,
    },
  },
};

const user = createSlice({
  name,
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserStateType>) => {
      state.user.data = action.payload;
    },
  },
});

export default user.reducer;
export const setUser = user.actions.setUser;
