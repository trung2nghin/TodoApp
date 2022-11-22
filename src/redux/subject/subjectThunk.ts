import { createAsyncThunk } from '@reduxjs/toolkit';

import SubjectAPI from '../../api/SubjectAPI';
import { Subject } from '../../types/subject';

export const getSubject = createAsyncThunk(
  'subject/getSubject',
  async (page, thunkApi) => {
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
  async (payload: Subject, thunkApi) => {
    try {
      let response: any;
      await SubjectAPI.postSubjectThunk(payload).then(res => {
        response = res.data;
      });
      return response;
    } catch (error: any) {
      const message = error.message;
      return thunkApi.rejectWithValue(message);
    }
  },
);

export const putSubject = createAsyncThunk(
  'subject/putSubject',
  async (payload: Subject, thunkApi) => {
    try {
      let response: any;
      await SubjectAPI.putSubjectThunk(payload).then(res => {
        response = res.data;
      });
      return response;
    } catch (error: any) {
      const message = error.message;
      return thunkApi.rejectWithValue(message);
    }
  },
);
