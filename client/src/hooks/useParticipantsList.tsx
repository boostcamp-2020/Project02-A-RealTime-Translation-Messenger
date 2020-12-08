import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../modules';
import { setParticipantsList } from '../modules/participantsList';
import { useCallback } from 'react';

import { ParticipantsType } from '../@types/types';

export default function useParticipantsList() {
  const { data } = useSelector((state: RootState) => state.participantsList.participantsList);
  const dispatch = useDispatch();

  const onSetParticipantsList = useCallback(
    (participantsList: ParticipantsType[]) => dispatch(setParticipantsList(participantsList)),
    [dispatch],
  );

  return {
    data,
    onSetParticipantsList,
  };
}
