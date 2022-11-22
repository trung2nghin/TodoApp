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
import { useNavigation, useRoute } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { getStudent, putStudent } from '../../redux/student/studentThunk';
import { Colors, Metrics } from '../../assets';
import { FormValues } from '../../types/hook-form-types';
import InputForm from '../components/InputForm';
import { getSubject } from '../../redux/subject/subjectThunk';
import ListSubject from '../components/ListSubject';
import { Subject } from '../../types/subject';
import { ImageData, ImageDataType } from '../AddStudent/ImageData';
import { StudentInfoScreenRouteProp } from '../../navigation/configs';

const StudentInfoScreen: FC = () => {
  const { params } = useRoute<StudentInfoScreenRouteProp>();
  const [pickImg, setPickImg] = useState<ImageDataType>();
  const [subjectData, setSubjectData] = useState<Array<Subject>>(
    params.item.subject,
  );

  const { goBack } = useNavigation();
  const dispatch = useAppDispatch();
  const { data } = useAppSelector(state => state.reducer.subjectReducer);

  const { dataStudent, error, loading } = useAppSelector(
    state => state.reducer.studentReducer,
  );

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

  const parentCallbackDelete = useCallback((child: Subject) => {
    setSubjectData(e => {
      let a = e.filter(item => item.id !== child.id);
      return a;
    });
  }, []);

  const parentCallback = useCallback((child: Subject) => {
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
        id: params.item.id,
        avatar: pickImg?.uri,
      };
      await dispatch(putStudent(payload));
      if (error === null) {
        Alert.alert('SUCCESS TO EDIT STUDENT');
      } else {
        Alert.alert('FAIL TO EDIT STUDENT');
      }
    },
    [subjectData, pickImg],
  );

  return (
    <KeyboardAvoidingView style={styles.container}>
      <SafeAreaView>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={async () => {
              goBack();
              await dispatch(getStudent(1));
            }}>
            <Ionicons name={'chevron-back'} size={30} color={Colors.black} />
          </TouchableOpacity>
          <Text style={styles.txt}>STUDENT INFO</Text>
        </View>
        <Text style={[styles.txt, { marginBottom: 16 }]}>Pick your avatar</Text>
        <View style={styles.viewImg}>
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
          parentCallbackDelete={parentCallbackDelete}
          isStudentList
        />
        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          style={styles.btnSubmit}>
          <Text style={styles.txtEdit}>EDIT STUDENT</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default StudentInfoScreen;

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
  viewImg: {
    width: '100%',
    height: Metrics.screen.width / 6,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 24,
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
  txtEdit: { color: Colors.white },
  img: { width: '100%', height: '100%', borderRadius: 40 },
  btnImg: {
    width: Metrics.screen.width / 5.6,
    height: Metrics.screen.width / 5.6,
    borderWidth: 4,
    borderRadius: 40,
  },
});
