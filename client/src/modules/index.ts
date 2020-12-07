import { combineReducers } from 'redux';

import roomList from './roomList';

const rootReducer = combineReducers({ roomList });

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
