import React, { FC, useCallback, useEffect, useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useForm } from 'react-hook-form';
import { useNavigation, useRoute } from '@react-navigation/native';

import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { postStudent, putStudent } from '../../redux/student/studentThunk';
import { Colors, Metrics } from '../../assets';
import { FormValues } from '../../types/hook-form-types';
import InputForm from '../components/InputForm';
import { getSubject } from '../../redux/subject/subjectThunk';
import ListSubject from '../components/ListSubject';
import { Subject } from '../../types/subject';
import { ImageData, ImageDataType } from '../AddStudent/ImageData';
import { StudentInfoScreenRouteProp } from '../../navigation/configs';

const AddStudentScreen: FC = () => {
  const { params } = useRoute<StudentInfoScreenRouteProp>();
  const [pickImg, setPickImg] = useState<ImageDataType>();
  const [subjectData, setSubjectData] = useState<Array<Subject>>([]);

  const { goBack } = useNavigation();
  const dispatch = useAppDispatch();
  const { data } = useAppSelector(state => state.reducer.subjectReducer);

  useEffect(() => {
    dispatch(getSubject());
  }, []);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      avatar: params.item.avatar,
      name: params.item.name,
      email: params.item.email,
      age: params.item.age,
      subject: params.item.subject,
    },
  });

  const parentCallback = useCallback((child: Subject) => {
    setSubjectData(e => {
      let a = e.filter(item => item.id !== child.id);
      return [...a, child];
    });
  }, []);

  const onSubmit = useCallback(
    (data: any) => {
      let payload = {
        ...data,
        subject: subjectData,
        id: '',
        avatar: pickImg?.uri,
      };
      dispatch(putStudent(payload));
    },
    [subjectData, pickImg],
  );

  return (
    <KeyboardAvoidingView style={styles.container}>
      <SafeAreaView>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => goBack()}>
            <Text>Back</Text>
          </TouchableOpacity>
          <Text>STUDENT INFO</Text>
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
        <ListSubject data={subjectData} />
        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          style={styles.btnSubmit}>
          <Text style={{ color: Colors.white }}>EDIT STUDENT</Text>
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
