import { combineReducers } from 'redux';

import roomList from './roomList';
import participantsList from './participantsList';
import chat from './chat';

const rootReducer = combineReducers({ roomList, participantsList, chat });

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
