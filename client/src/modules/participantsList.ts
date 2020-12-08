import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { ParticipantsType } from '../@types/types';

const name = 'participantsList';

type InitialStateType = {
  participantsList: {
    data: ParticipantsType[] | null;
  };
};

const initialState: InitialStateType = {
  participantsList: {
    data: null,
  },
};

const participantsList = createSlice({
  name,
  initialState,
  reducers: {
    setParticipantsList: (state, action: PayloadAction<ParticipantsType[]>) => {
      state.participantsList.data = action.payload;
    },
  },
  extraReducers: {},
});

export default participantsList.reducer;
export const setParticipantsList = participantsList.actions.setParticipantsList;
