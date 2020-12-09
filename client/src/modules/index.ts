import { combineReducers } from 'redux';

import roomList from './roomList';
import room from './room';
import participantsList from './participantsList';
import user from './user';

const rootReducer = combineReducers({ roomList, participantsList, user, room });

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
