import React, { FC, useCallback, useEffect, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useForm } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { Colors, Metrics } from '../../assets';
import { FormValuesSubject } from '../../types/hook-form-types';
import InputForm from '../components/InputForm';
import { getSubject, postSubject } from '../../redux/subject/subjectThunk';
import { Subject } from '../../types/subject';
import { AddStudentScreenProp } from '../../navigation/configs';

const AddSubjectScreen: FC = () => {
  const [subjectData, setSubjectData] = useState<Array<Subject>>([]);
  const { goBack, navigate } = useNavigation<AddStudentScreenProp>();
  const dispatch = useAppDispatch();

  const { data, error, loading } = useAppSelector(
    state => state.reducer.subjectReducer,
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValuesSubject>({
    defaultValues: {
      name: '',
      teacher: '',
      classroom: '',
      student: [],
    },
  });

  const onSubmit = useCallback(
    async (data: any) => {
      let payload = {
        ...data,
        student: [],
        id: '',
      };
      await dispatch(postSubject(payload));
      if (error === null) {
        await dispatch(getSubject());
        goBack();
        Alert.alert('SUCCESS TO ADD SUBJECT');
      } else {
        Alert.alert('FAIL TO ADD SUBJECT');
      }
    },
    [subjectData],
  );

  return (
    <KeyboardAvoidingView style={styles.container}>
      <SafeAreaView>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              goBack();
              dispatch(getSubject());
            }}>
            <Ionicons name={'chevron-back'} size={30} color={Colors.black} />
          </TouchableOpacity>
          <Text style={styles.txt}>ADD SUBJECT</Text>
        </View>
        <View style={styles.viewInput}>
          <InputForm
            control={control}
            rules={{
              maxLength: { value: 50, message: 'Exceeded allowed' },
              required: { value: true, message: 'Required Information' },
            }}
            name={'name'}
            error={errors?.name?.message}
            placeholder={'Name'}
          />
          <InputForm
            control={control}
            rules={{
              maxLength: { value: 50, message: 'Exceeded allowed' },
              required: { value: true, message: 'Required Information' },
            }}
            name={'teacher'}
            error={errors?.teacher?.message}
            placeholder={'Teacher'}
          />
          <InputForm
            control={control}
            rules={{
              maxLength: { value: 10, message: 'Exceeded allowed' },
              required: { value: true, message: 'Required Information' },
            }}
            name={'classroom'}
            error={errors?.classroom?.message}
            placeholder={'Classroom'}
          />
        </View>
        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          style={styles.btnSubmit}>
          <Text style={styles.txtAdd}>ADD SUBJECT</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default AddSubjectScreen;

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
  viewInput: {
    marginTop: 24,
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
  txtAdd: { color: Colors.white },
});
