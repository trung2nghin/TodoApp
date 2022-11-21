import React, { FC } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { SubjectInfoScreenRouteProp } from '../../navigation/configs';

const SubjectInfoScreen: FC = () => {
  const { params } = useRoute<SubjectInfoScreenRouteProp>();

  return (
    <SafeAreaView>
      <Text>Subject Info Screen</Text>
      <Text>{params.item.name}</Text>
    </SafeAreaView>
  );
};

export default SubjectInfoScreen;

const styles = StyleSheet.create({});
