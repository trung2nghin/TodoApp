import { combineReducers } from '@reduxjs/toolkit';

import studentReducer from './student/studentSlice';
import subjectReducer from './subject/subjectSlice';

const rootReducer = combineReducers({
  studentReducer: studentReducer,
  subjectReducer: subjectReducer,
});

export default rootReducer;

export type State = ReturnType<typeof rootReducer>;
