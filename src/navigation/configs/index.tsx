import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { Student } from '../../types/student';
import { Subject } from '../../types/subject';

export type RootStackParamList = {
  HOME: undefined;
  LIST_STUDENT: undefined;
  STUDENT_INFO: {
    item: Student;
  };
  ADD_STUDENT: undefined;
  LIST_SUBJECT: undefined;
  SUBJECT_INFO: {
    item: Subject;
  };
  ADD_SUBJECT: undefined;
};

/*##### ROUTE PARAMS #####*/

export type HomeScreenRouteProp = RouteProp<RootStackParamList, 'HOME'>;

export type StudentInfoScreenRouteProp = RouteProp<
  RootStackParamList,
  'STUDENT_INFO'
>;

export type SubjectInfoScreenRouteProp = RouteProp<
  RootStackParamList,
  'SUBJECT_INFO'
>;

/*##### ROUTE STACK #####*/

export type HomeScreenProp = StackNavigationProp<RootStackParamList, 'HOME'>;

export type ListStudentScreenProp = StackNavigationProp<
  RootStackParamList,
  'LIST_STUDENT'
>;

export type ListSubjectScreenProp = StackNavigationProp<
  RootStackParamList,
  'LIST_SUBJECT'
>;
