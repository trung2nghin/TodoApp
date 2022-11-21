import React, { FC } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useAppDispatch } from '../../hooks/useRedux';
import { postSubject } from '../../redux/subject/subjectThunk';

const AddSubjectScreen: FC = () => {
  const dispatch = useAppDispatch();
  return (
    <SafeAreaView>
      <Text>AddSubjectScreen</Text>
      <TouchableOpacity
        onPress={() => dispatch(postSubject())}
        style={{
          width: 100,
          height: 20,
          backgroundColor: 'blue',
        }}></TouchableOpacity>
    </SafeAreaView>
  );
};

export default AddSubjectScreen;

const styles = StyleSheet.create({});
