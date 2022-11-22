import { Subject } from './subject';

export interface Student {
  id: string;
  name: string;
  avatar: string;
  age: number;
  email: string;
  subject: Array<Subject>;
}
