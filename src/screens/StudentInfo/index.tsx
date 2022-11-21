import React, { FC } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { StudentInfoScreenRouteProp } from '../../navigation/configs';

const StudentInfoScreen: FC = () => {
  const { params } = useRoute<StudentInfoScreenRouteProp>();

  return (
    <SafeAreaView>
      <Text>Student Info Screen</Text>
      <Text>{params.item.name}</Text>
    </SafeAreaView>
  );
};

export default StudentInfoScreen;

const styles = StyleSheet.create({});
