import React, { FC, useCallback, useEffect, useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';

import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { postStudent } from '../../redux/student/studentThunk';
import { Student } from '../../types/student';
import { Colors, Metrics } from '../../assets';
import { FormValues } from '../../types/hook-form-types';
import InputForm from '../components/InputForm';
import List from '../components/List';

const AddStudentScreen: FC = () => {
  const [pickImg, setPickImg] = useState(0);
  const { goBack } = useNavigation();
  const dispatch = useAppDispatch();
  const { loading, data } = useAppSelector(
    state => state.reducer.subjectReducer,
  );

  // useEffect(() => {
    
  
  //   return () => {
  //     second
  //   }
  // }, [third])
  

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

  const onSubmit = useCallback((data: any) => {
    console.log(data);

    // dispatch(postStudent());
  }, []);

  return (
    <KeyboardAvoidingView style={styles.container}>
      <SafeAreaView>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => goBack()}>
            <Text>Back</Text>
          </TouchableOpacity>
          <Text>ADD STUDENT SCREEN</Text>
        </View>
        <View
          style={{
            width: '100%',
            height: Metrics.screen.width / 6,
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginBottom: 24,
          }}>
          {[1, 2, 3].map((e, i) => (
            <TouchableOpacity
              key={e}
              onPress={() => setPickImg(e)}
              style={{
                width: Metrics.screen.width / 5.6,
                height: Metrics.screen.width / 5.6,
                borderWidth: 2,
                borderColor: i + 1 === pickImg ? 'red' : 'white',
              }}></TouchableOpacity>
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
                value: /^[A-Za-z]+$/i,
                message: 'Invalid mail format',
              },
              required: { value: true, message: 'Required Information' },
            }}
            name={'email'}
            error={errors?.email?.message}
            placeholder={'Email'}
          />
        </View>

        <List data={data} />
        {/* <List /> */}

        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          style={{
            width: '100%',
            height: 40,
            backgroundColor: Colors.black,
            alignSelf: 'center',
          }}>
          <Text>ADD STUDENT</Text>
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
});
