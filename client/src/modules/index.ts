import { combineReducers } from 'redux';

import roomList from './roomList';
import room from './room';

const rootReducer = combineReducers({ roomList, room });

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
