import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import MainPageNavigation from '../@types/mainPageNavigation';

const name = 'navigation';

type InitialStateType = {
  navigation: {
    data: MainPageNavigation;
  };
};

const initialState: InitialStateType = {
  navigation: {
    data: MainPageNavigation.USER_INFO,
  },
};

const user = createSlice({
  name,
  initialState,
  reducers: {
    setNavigation: (state, action: PayloadAction<MainPageNavigation>) => {
      state.navigation.data = action.payload;
    },
  },
});

export default user.reducer;
export const setNavigation = user.actions.setNavigation;
