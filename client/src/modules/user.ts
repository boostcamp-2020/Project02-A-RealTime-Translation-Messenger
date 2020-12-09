import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { UserStateType } from '../@types/types';

const name = 'user';

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
