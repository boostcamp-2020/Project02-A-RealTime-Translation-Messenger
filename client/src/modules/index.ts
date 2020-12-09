import { combineReducers } from 'redux';

import roomList from './roomList';
import chatInput from './chatInput';
import user from './user';
import participantsList from './participantsList';

const rootReducer = combineReducers({ roomList, chatInput, participantsList, user });

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
