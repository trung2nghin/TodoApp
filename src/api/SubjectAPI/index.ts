import AxiosClient from '../AxiosClient';
import { Subject } from '../../types/subject';

const SubjectAPI = {
  getSubjectThunk() {
    return AxiosClient.get('subject');
  },
  postSubjectThunk(payload: Subject) {
    return AxiosClient.post('subject', payload);
  },
};

export default SubjectAPI;
