import { combineReducers } from 'redux';

import roomList from './roomList';
import participantsList from './participantsList';

const rootReducer = combineReducers({ roomList, participantsList });

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
