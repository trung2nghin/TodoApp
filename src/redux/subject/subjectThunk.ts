import { createAsyncThunk } from '@reduxjs/toolkit';

import SubjectAPI from '../../api/SubjectAPI';

export const getSubject = createAsyncThunk(
  'subject/getSubject',
  async (payload, thunkApi) => {
    try {
      let response: any;
      await SubjectAPI.getSubjectThunk().then(res => {
        response = res.data;
      });
      return response;
    } catch (error: any) {
      const message = error.message;
      return thunkApi.rejectWithValue(message);
    }
  },
);

export const postSubject = createAsyncThunk(
  'subject/postSubject',
  async (payload, thunkApi) => {
    try {
      let response: any;
      await SubjectAPI.postSubjectThunk({
        id: '',
        name: 'Math',
        teacher: 'Hung',
        classroom: 'A10',
        student: ['1', '2', '3'],
        createdAt: '',
      }).then(res => {
        response = res.data;
      });
      return response;
    } catch (error: any) {
      const message = error.message;
      return thunkApi.rejectWithValue(message);
    }
  },
);
