import { combineReducers } from '@reduxjs/toolkit';

import folderReducer from './folder/folderSlice';

const rootReducer = combineReducers({
  folderReducer: folderReducer,
});

export default rootReducer;

export type State = ReturnType<typeof rootReducer>;
