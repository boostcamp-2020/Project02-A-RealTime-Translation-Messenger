import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { ChatLogsType, ParticipantsUpdateType } from '../@types/types';

const name = 'chat';

type InitialStateType = {
  chatLogs: {
    data: (ChatLogsType | ParticipantsUpdateType)[];
  };
};

const initialState: InitialStateType = {
  chatLogs: {
    data: [],
  },
};

const chat = createSlice({
  name,
  initialState,
  reducers: {
    stackChats: (state, action: PayloadAction<ChatLogsType | ParticipantsUpdateType>) => {
      state.chatLogs.data.push(action.payload);
    },
  },
});

export default chat.reducer;
export const stackChats = chat.actions.stackChats;
