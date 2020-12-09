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

const navigation = createSlice({
  name,
  initialState,
  reducers: {
    setNavigation: (state, action: PayloadAction<MainPageNavigation>) => {
      state.navigation.data = action.payload;
    },
  },
});

export default navigation.reducer;
export const setNavigation = navigation.actions.setNavigation;
