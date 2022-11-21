import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Student } from '../../types/student';

import { getStudent, postStudent } from './studentThunk';

interface StudentState {
  loading: boolean;
  error: string | null;
  data: Student[];
}

const initialState: StudentState = {
  loading: false,
  error: null,
  data: [],
};

export const studentSlice = createSlice({
  name: 'student',
  initialState: initialState,
  reducers: {
    // getStudent: (state, action) => {},
    // addStudent: (state, action) => {},
    setStudentReload(state) {
      state.data = [];
      return state;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getStudent.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(
        getStudent.fulfilled,
        (state, action: PayloadAction<Student[]>) => {
          state.loading = false;
          state.data = state.data.concat(action.payload);
        },
      )
      .addCase(getStudent.rejected, (state, action: PayloadAction<any>) => {
        state.error = action.payload;
      })
      .addCase(postStudent.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(
        postStudent.fulfilled,
        (state, action: PayloadAction<Student[]>) => {
          state.loading = false;
          state.data = state.data.concat(action.payload);
        },
      )
      .addCase(postStudent.rejected, (state, action: PayloadAction<any>) => {
        state.error = action.payload;
      });
  },
});

export const { setStudentReload } = studentSlice.actions;

export default studentSlice.reducer;
