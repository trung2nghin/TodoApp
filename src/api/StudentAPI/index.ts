import AxiosClient from '../AxiosClient';
import { Student } from '../../types/student';

const StudentAPI = {
  getStudentThunk(page: number) {
    return AxiosClient.get(`student?p=${page}&l=30`);
  },
  postStudentThunk(payload: Student) {
    return AxiosClient.post('student', payload);
  },
};

export default StudentAPI;
