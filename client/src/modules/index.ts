import { combineReducers } from 'redux';

import roomList from './roomList';
import room from './room';
import participantsList from './participantsList';
import chat from './chat';
import chatInput from './chatInput';
import user from './user';
import navigation from './navigation';

const rootReducer = combineReducers({ roomList, participantsList, chat, chatInput, user, room, navigation });

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
