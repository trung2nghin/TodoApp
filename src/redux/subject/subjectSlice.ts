import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Subject } from '../../types/subject';
import { getSubject, postSubject } from './subjectThunk';

interface SubjectState {
  loading: boolean;
  error: string | null;
  data: Subject[];
}

const initialState: SubjectState = {
  loading: false,
  error: null,
  data: [],
};

export const subjectSlice = createSlice({
  name: 'subject',
  initialState: initialState,
  reducers: {
    // getSubject: (state, action) => {},
    // addSubject: (state, action) => {},
  },
  extraReducers(builder) {
    builder
      .addCase(getSubject.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(
        getSubject.fulfilled,
        (state, action: PayloadAction<Subject[]>) => {
          state.loading = false;
          state.data = action.payload;
        },
      )
      .addCase(getSubject.rejected, (state, action: PayloadAction<any>) => {
        state.error = action.payload;
      })
      .addCase(postSubject.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(
        postSubject.fulfilled,
        (state, action: PayloadAction<Subject[]>) => {
          state.loading = false;
          state.data = state.data.concat(action.payload);
        },
      )
      .addCase(postSubject.rejected, (state, action: PayloadAction<any>) => {
        state.error = action.payload;
      });
  },
});

export const {} = subjectSlice.actions;

export default subjectSlice.reducer;
