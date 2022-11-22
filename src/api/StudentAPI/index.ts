import AxiosClient from '../AxiosClient';
import { Student } from '../../types/student';

const StudentAPI = {
  getStudentThunk(page: number) {
    return AxiosClient.get(`student?p=${page}&l=30`);
  },
  getAllStudentThunk() {
    return AxiosClient.get('student');
  },
  postStudentThunk(payload: Student) {
    return AxiosClient.post('student', payload);
  },
  putStudentThunk(payload: Student) {
    return AxiosClient.put(`student/${payload.id}`, payload);
  },
};

export default StudentAPI;
