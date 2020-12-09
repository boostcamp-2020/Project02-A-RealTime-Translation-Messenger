import { combineReducers } from 'redux';

import roomList from './roomList';
import room from './room';
import participantsList from './participantsList';
import chat from './chat';
import chatInput from './chatInput';
import user from './user';

const rootReducer = combineReducers({ roomList, participantsList, chat, chatInput, user, room });

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
