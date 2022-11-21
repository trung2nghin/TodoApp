import React, { FC, useCallback, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { HomeScreenProp } from '../../navigation/configs';
import StudentAPI from '../../api/StudentAPI';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { getStudent } from '../../redux/student/studentThunk';

const HomeScreen: FC = () => {
  const { navigate } = useNavigation<HomeScreenProp>();

  return (
    <View>
      <Text>HomeScreen</Text>
      <TouchableOpacity
        style={{ width: 100, height: 25, backgroundColor: 'red' }}
        onPress={() => navigate('LIST_STUDENT')}></TouchableOpacity>
      <TouchableOpacity
        style={{ width: 100, height: 25, backgroundColor: 'blue' }}
        onPress={() => navigate('LIST_SUBJECT')}></TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
