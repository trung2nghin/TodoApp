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
  const { data } = useAppSelector(state => state.reducer.subjectReducer);
  const { dataStudent, error, loading } = useAppSelector(
    state => state.reducer.studentReducer,
  );
  const [pickImg, setPickImg] = useState<ImageDataType>();
  const [subjectData, setSubjectData] = useState<Array<Subject>>([]);
  const [onChangeDataStudent, setOnChangeDataStudent] =
    useState<Array<Subject>>(data);
  const [onHandleSubmit, setOnHandleSubmit] = useState(false);
  const { goBack, navigate } = useNavigation<AddStudentScreenProp>();
  const dispatch = useAppDispatch();

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

  const parentCallback = useCallback((child: Subject) => {
    console.log(child);

    // setOnChangeDataStudent(e => console.log(e));
    setSubjectData(e => {
      let a = e.filter(item => item.id !== child.id);
      return [...a, child];
    });
  }, []);

  const parentCallbackDelete = useCallback((child: Subject) => {
    setSubjectData(e => {
      let a = e.filter(item => item.id !== child.id);
      return [...a, child];
    });
  }, []);

  const onSubmit = useCallback(
    async (data: any) => {
      let payload = {
        ...data,
        subject: subjectData,
        id: '',
        avatar: pickImg?.uri,
      };
      setOnHandleSubmit(true);
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
            <Text>Back</Text>
          </TouchableOpacity>
          <Text>ADD STUDENT</Text>
        </View>
        <View
          style={{
            width: '100%',
            height: Metrics.screen.width / 6,
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginBottom: 24,
          }}>
          {ImageData.map((e, i) => (
            <TouchableOpacity
              key={e.id}
              onPress={() => {
                setPickImg(e);
              }}
              style={{
                width: Metrics.screen.width / 5.6,
                height: Metrics.screen.width / 5.6,
                borderWidth: 4,
                borderColor: i + 1 === pickImg?.id ? 'red' : 'white',
                borderRadius: 40,
              }}>
              <Image
                source={{
                  uri: e.uri,
                }}
                style={{ width: '100%', height: '100%', borderRadius: 40 }}
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
              // pattern: {
              //   value: /^[A-Za-z]+$/i,
              //   message: 'Invalid mail format',
              // },
              required: { value: true, message: 'Required Information' },
            }}
            name={'email'}
            error={errors?.email?.message}
            placeholder={'Email'}
          />
        </View>
        <ListSubject data={data} parentCallback={parentCallback} />
        {subjectData.length < 1 && onHandleSubmit ? (
          <Text style={{ color: Colors.red }}>
            Please choose at least 1 subject
          </Text>
        ) : (
          <></>
        )}
        <ListSubject
          data={subjectData}
          isStudentList
          parentCallbackDelete={parentCallbackDelete}
        />
        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          style={styles.btnSubmit}>
          <Text style={{ color: Colors.white }}>ADD STUDENT</Text>
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
});
