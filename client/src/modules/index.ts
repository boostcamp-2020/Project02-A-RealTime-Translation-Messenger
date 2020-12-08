import { combineReducers } from 'redux';

import roomList from './roomList';
import user from './user';

const rootReducer = combineReducers({ roomList, user });

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
