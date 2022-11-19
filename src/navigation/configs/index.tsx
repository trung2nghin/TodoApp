import { RouteProp } from '@react-navigation/native';
import { Subject } from '../../types/subject';

export const Stack = {
  NOTE: 'NOTE',
  DETAIL: 'DETAIL',
};

export type RootStackParamList = {
  NOTE: {
    data: Subject;
    index: number;
  };
  DETAIL: {
    noteData: Subject;
  };
};

export type NoteScreenRouteProp = RouteProp<RootStackParamList, 'NOTE'>;

export type DetailScreenRouteProp = RouteProp<RootStackParamList, 'DETAIL'>;
