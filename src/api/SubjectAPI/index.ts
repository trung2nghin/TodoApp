import AxiosClient from '../AxiosClient';
import { Subject } from '../../types/subject';

const SubjectAPI = {
  getSubjectThunk() {
    return AxiosClient.get('subject');
  },
  postSubjectThunk(payload: Subject) {
    return AxiosClient.post('subject', payload);
  },
  putSubjectThunk(payload: Subject) {
    return AxiosClient.put(`subject/${payload.id}`, payload);
  },
};

export default SubjectAPI;
