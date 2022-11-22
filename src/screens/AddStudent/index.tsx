import React, { FC, useCallback, useEffect, useState } from 'react';
import {
  Alert,
  Image,
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
import { getStudent, postStudent } from '../../redux/student/studentThunk';
import { Colors, Metrics } from '../../assets';
import { FormValues } from '../../types/hook-form-types';
import InputForm from '../components/InputForm';
import { getSubject } from '../../redux/subject/subjectThunk';
import ListSubject from '../components/ListSubject';
import { Subject } from '../../types/subject';
import { ImageData, ImageDataType } from './ImageData';
import { AddStudentScreenProp } from '../../navigation/configs';

const AddStudentScreen: FC = () => {
  const [pickImg, setPickImg] = useState<ImageDataType>();
  const [subjectData, setSubjectData] = useState<Array<Subject>>([]);
  const { goBack, navigate } = useNavigation<AddStudentScreenProp>();
  const dispatch = useAppDispatch();

  const { data } = useAppSelector(state => state.reducer.subjectReducer);
  const { error } = useAppSelector(state => state.reducer.studentReducer);

  useEffect(() => {
    dispatch(getSubject());
  }, []);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      name: '',
      email: '',
      age: '',
      subject: [],
    },
  });

  let parentCallback = useCallback((child: Subject) => {
    setSubjectData(e => {
      let a = e.filter(item => item.id !== child.id);
      return [...a, child];
    });
  }, []);

  const parentCallbackDelete = useCallback((child: Subject) => {
    setSubjectData(e => e.filter(item => item.id !== child.id));
  }, []);

  const onSubmit = useCallback(
    async (data: any) => {
      let payload = {
        ...data,
        subject: subjectData,
        id: '',
        avatar: pickImg?.uri,
      };
      await dispatch(postStudent(payload));
      if (error === null) {
        await dispatch(getStudent(1));
        goBack();
        Alert.alert('SUCCESS TO ADD STUDENT');
      } else {
        Alert.alert('FAIL TO ADD STUDENT');
      }
    },
    [subjectData, pickImg],
  );

  return (
    <KeyboardAvoidingView style={styles.container}>
      <SafeAreaView>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              goBack();
              dispatch(getStudent(1));
            }}>
            <Ionicons name={'chevron-back'} size={30} color={Colors.black} />
          </TouchableOpacity>
          <Text style={styles.txt}>ADD STUDENT</Text>
        </View>
        <Text style={[styles.txt, { marginBottom: 16, textAlign: 'center' }]}>
          Pick your avatar
        </Text>
        <View style={styles.imgView}>
          {ImageData.map((e, i) => (
            <TouchableOpacity
              key={e.id}
              onPress={() => {
                setPickImg(e);
              }}
              style={[
                styles.btnImg,
                { borderColor: i + 1 === pickImg?.id ? 'red' : 'white' },
              ]}>
              <Image
                source={{
                  uri: e.uri,
                }}
                style={styles.img}
              />
            </TouchableOpacity>
          ))}
        </View>
        <View>
          <InputForm
            control={control}
            rules={{
              maxLength: { value: 20, message: 'Exceeded allowed characters' },
              required: { value: true, message: 'Required Information' },
            }}
            name={'name'}
            error={errors?.name?.message}
            placeholder={'Name'}
          />
          <InputForm
            control={control}
            rules={{
              min: { value: 1, message: 'Invalid value' },
              max: { value: 99, message: 'Invalid value' },
              required: { value: true, message: 'Required Information' },
            }}
            name={'age'}
            error={errors?.age?.message}
            placeholder={'Age'}
          />
          <InputForm
            control={control}
            rules={{
              maxLength: { value: 20, message: 'Exceeded allowed characters' },
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid mail format',
              },
              required: { value: true, message: 'Required Information' },
            }}
            name={'email'}
            error={errors?.email?.message}
            placeholder={'Email'}
          />
        </View>
        <ListSubject data={data} parentCallback={parentCallback} />
        <ListSubject
          data={subjectData}
          isStudentList
          parentCallbackDelete={parentCallbackDelete}
        />
        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          style={styles.btnSubmit}>
          <Text style={styles.txtAdd}>ADD STUDENT</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default AddStudentScreen;

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
  imgView: {
    width: '100%',
    height: Metrics.screen.width / 6,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 24,
  },
  btnImg: {
    width: Metrics.screen.width / 5.6,
    height: Metrics.screen.width / 5.6,
    borderWidth: 4,
    borderRadius: 40,
  },
  img: { width: '100%', height: '100%', borderRadius: 40 },
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
  },
  txtAdd: { color: Colors.white },
});
