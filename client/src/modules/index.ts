import { combineReducers } from 'redux';

import roomList from './roomList';
import chatInput from './chatInput';

const rootReducer = combineReducers({ roomList, chatInput });

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
