import { createAsyncThunk } from '@reduxjs/toolkit';

import StudentAPI from '../../api/StudentAPI';

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
  async (payload, thunkApi) => {
    try {
      let response: any;
      await StudentAPI.postStudentThunk({
        id: '',
        name: 'MrTrung',
        avatar: '',
        age: 10,
        email: 'trung@gmail.com',
        subject: ['1'],
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
