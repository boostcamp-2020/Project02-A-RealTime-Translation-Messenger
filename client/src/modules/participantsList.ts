import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { ParticipantsType } from '../@types/types';

const name = 'participantsList';

type InitialStateType = {
  participantsList: {
    data: ParticipantsType[];
  };
};

const initialState: InitialStateType = {
  participantsList: {
    data: [],
  },
};

const participantsList = createSlice({
  name,
  initialState,
  reducers: {
    setParticipantsList: (state, action: PayloadAction<ParticipantsType[]>) => {
      state.participantsList.data = action.payload;
    },
    resetParticipantsList: (state) => {
      state.participantsList.data = [];
    },
  },
});

export default participantsList.reducer;
export const setParticipantsList = participantsList.actions.setParticipantsList;
export const resetParticipantsList = participantsList.actions.resetParticipantsList;
