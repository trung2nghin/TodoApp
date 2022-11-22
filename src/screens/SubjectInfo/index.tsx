import React, { FC, useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useForm } from 'react-hook-form';
import { useNavigation, useRoute } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { Colors, Metrics } from '../../assets';
import { FormValuesSubject } from '../../types/hook-form-types';
import InputForm from '../components/InputForm';
import { getSubject, putSubject } from '../../redux/subject/subjectThunk';
import ListSubject from '../components/ListSubject';
import { Subject } from '../../types/subject';
import { ImageDataType } from '../AddStudent/ImageData';
import { SubjectInfoScreenRouteProp } from '../../navigation/configs';
import { getAllStudent } from '../../redux/student/studentThunk';
import { Student } from '../../types/student';

const SubjectInfoScreen: FC = () => {
  const { params } = useRoute<SubjectInfoScreenRouteProp>();
  const { goBack } = useNavigation();
  const { data, error, loading } = useAppSelector(
    state => state.reducer.subjectReducer,
  );
  const { dataStudent } = useAppSelector(state => state.reducer.studentReducer);
  const [subjectData, setSubjectData] = useState<Array<Subject>>(data);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getSubject());
    dispatch(getAllStudent());
  }, []);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValuesSubject>({
    defaultValues: {
      name: params.item.name,
      classroom: params.item.classroom,
      teacher: params.item.teacher,
      student: params.item.student,
    },
  });

  let data01 = JSON.parse(JSON.stringify(data));
  let data02 = JSON.parse(JSON.stringify(dataStudent));

  data01.forEach((c: Subject) => {
    data02.forEach((s: Student) => {
      if (
        s.subject.some(z => {
          return z.id === c.id;
        })
      ) {
        c.student.push(s);
      }
    });
  });

  // const parentCallback = useCallback((child: Subject) => {
  //   console.log(child);

  //   setSubjectData(e => {
  //     let a = e.filter(item => item.id !== child.id);
  //     // return [...a, child];
  //   });
  // }, []);

  const onSubmit = useCallback(
    async (data: any) => {
      let payload = {
        ...data,
        student: [],
        id: params.item.id,
      };
      dispatch(putSubject(payload));
      if (error === null) {
        Alert.alert('SUCCESS TO EDIT SUBJECT');
      } else {
        Alert.alert('FAIL TO EDIT SUBJECT');
      }
    },
    [subjectData],
  );

  return (
    <KeyboardAvoidingView style={styles.container}>
      <SafeAreaView>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={async () => {
              goBack();
              await dispatch(getSubject());
            }}>
            <Ionicons name={'chevron-back'} size={30} color={Colors.black} />
          </TouchableOpacity>
          <Text style={styles.txt}>SUBJECT INFO</Text>
        </View>
        <View style={styles.viewImg}>
          <InputForm
            control={control}
            rules={{
              maxLength: { value: 50, message: 'Exceeded allowed characters' },
              required: { value: true, message: 'Required Information' },
            }}
            name={'name'}
            error={errors?.name?.message}
            placeholder={'Name'}
          />
          <InputForm
            control={control}
            rules={{
              maxLength: { value: 50, message: 'Exceeded allowed characters' },
              required: { value: true, message: 'Required Information' },
            }}
            name={'teacher'}
            error={errors?.teacher?.message}
            placeholder={'Teacher'}
          />
          <InputForm
            control={control}
            rules={{
              maxLength: { value: 10, message: 'Exceeded allowed characters' },
              required: { value: true, message: 'Required Information' },
            }}
            name={'classroom'}
            error={errors?.classroom?.message}
            placeholder={'Classroom'}
          />
        </View>
        {loading ? (
          <ActivityIndicator size="large" color={Colors.black} />
        ) : (
          <ListSubject
            data={data01[Number(params.item.id) - 1].student}
            isDel
          />
        )}
        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          style={styles.btnSubmit}>
          <Text style={styles.txtEdit}>EDIT STUDENT</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default SubjectInfoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  safeContainer: {
    flex: 1,
  },
  header: {
    height: Metrics.screen.height / 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    backgroundColor: Colors.white,
    width: '100%',
    height: 40,
    padding: 10,
    borderRadius: 1,
  },
  btnSubmit: {
    width: '100%',
    height: 40,
    backgroundColor: Colors.black,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txt: {
    fontSize: 17,
    color: Colors.black,
    textAlign: 'center',
  },
  viewImg: {
    marginTop: 24,
  },
  txtEdit: { color: Colors.white },
});
