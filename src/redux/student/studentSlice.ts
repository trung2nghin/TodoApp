import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Student } from '../../types/student';

import {
  getAllStudent,
  getStudent,
  postStudent,
  putStudent,
} from './studentThunk';

interface StudentState {
  loading: boolean;
  error: string | null;
  dataStudent: Student[];
}

const initialState: StudentState = {
  loading: false,
  error: null,
  dataStudent: [],
};

export const studentSlice = createSlice({
  name: 'student',
  initialState: initialState,
  reducers: {
    // getStudent: (state, action) => {},
    // addStudent: (state, action) => {},
    setStudentReload(state) {
      state.dataStudent = [];
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
          state.dataStudent = state.dataStudent.concat(action.payload);
        },
      )
      .addCase(getStudent.rejected, (state, action: PayloadAction<any>) => {
        state.error = action.payload;
      })
      .addCase(getAllStudent.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(
        getAllStudent.fulfilled,
        (state, action: PayloadAction<Student[]>) => {
          state.loading = false;
          state.dataStudent = action.payload;
        },
      )
      .addCase(getAllStudent.rejected, (state, action: PayloadAction<any>) => {
        state.error = action.payload;
      })
      .addCase(postStudent.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(
        postStudent.fulfilled,
        (state, action: PayloadAction<Student[]>) => {
          state.loading = false;
          // state.dataStudent = state.dataStudent.concat(action.payload);
        },
      )
      .addCase(postStudent.rejected, (state, action: PayloadAction<any>) => {
        state.error = action.payload;
      })
      .addCase(putStudent.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(
        putStudent.fulfilled,
        (state, action: PayloadAction<Student[]>) => {
          state.loading = false;
          // state.dataStudent = state.dataStudent.concat(action.payload);
        },
      )
      .addCase(putStudent.rejected, (state, action: PayloadAction<any>) => {
        state.error = action.payload;
      });
  },
});

export const { setStudentReload } = studentSlice.actions;

export default studentSlice.reducer;
