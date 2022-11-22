import { Student } from './student';

export interface Subject {
  name: string;
  teacher: string;
  classroom: string;
  student: Array<Student>;
  id: string;
}
