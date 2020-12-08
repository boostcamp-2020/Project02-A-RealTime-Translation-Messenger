import { combineReducers } from 'redux';

import roomList from './roomList';
import room from './room';
import participantsList from './participantsList';

const rootReducer = combineReducers({ roomList, room, participantsList });

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
