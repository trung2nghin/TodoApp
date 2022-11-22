import { Student } from './student';

export interface FormValues {
  avatar?: string;
  name?: string;
  email?: string;
  age?: number | string;
  subject?: Array<any>;
}

export interface FormValuesSubject {
  name?: string;
  teacher?: string;
  classroom?: string;
  student?: Array<Student>;
  id?: string;
}
