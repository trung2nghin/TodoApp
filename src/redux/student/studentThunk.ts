import { createAsyncThunk } from '@reduxjs/toolkit';

import StudentAPI from '../../api/StudentAPI';
import { Student } from '../../types/student';

export const getStudent = createAsyncThunk(
  'student/getStudent',
  async (page: number, thunkApi) => {
    try {
      let response: any;
      await StudentAPI.getStudentThunk(page).then(res => {
        response = res.data;
      });
      return response;
    } catch (error: any) {
      const message = error.message;
      return thunkApi.rejectWithValue(message);
    }
  },
);

export const postStudent = createAsyncThunk(
  'student/postStudent',
  async (payload: Student, thunkApi) => {
    try {
      let response: any;
      await StudentAPI.postStudentThunk(payload).then(res => {
        response = res.data;
      });
      return response;
    } catch (error: any) {
      const message = error.message;
      return thunkApi.rejectWithValue(message);
    }
  },
);

export const putStudent = createAsyncThunk(
  'student/postStudent',
  async (payload: Student, thunkApi) => {
    try {
      let response: any;
      await StudentAPI.putStudentThunk(payload).then(res => {
        response = res.data;
      });
      return response;
    } catch (error: any) {
      const message = error.message;
      return thunkApi.rejectWithValue(message);
    }
  },
);
