import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { ChatLogsType } from '../@types/types';

const name = 'chat';

type InitialStateType = {
  chatLogs: {
    data: ChatLogsType[] | null;
  };
};

const initialState: InitialStateType = {
  chatLogs: {
    data: null,
  },
};

const chat = createSlice({
  name,
  initialState,
  reducers: {
    stackChats: (state, action: PayloadAction<ChatLogsType[]>) => {
      state.chatLogs.data = action.payload;
    },
  },
  extraReducers: {},
});

export default chat.reducer;
export const stackChats = chat.actions.stackChats;
