import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { RootStackParamList } from './configs';
import {
  AddStudentScreen,
  AddSubjectScreen,
  HomeScreen,
  ListStudentScreen,
  StudentInfoScreen,
  SubjectInfoScreen,
} from '../screens';
import ListSubjectScreen from '../screens/ListSubject';

const RootStack = createStackNavigator<RootStackParamList>();

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <RootStack.Screen name={'HOME'} component={HomeScreen} />
        <RootStack.Screen name={'LIST_STUDENT'} component={ListStudentScreen} />
        <RootStack.Screen name={'STUDENT_INFO'} component={StudentInfoScreen} />
        <RootStack.Screen name={'ADD_STUDENT'} component={AddStudentScreen} />
        <RootStack.Screen name={'LIST_SUBJECT'} component={ListSubjectScreen} />
        <RootStack.Screen name={'SUBJECT_INFO'} component={SubjectInfoScreen} />
        <RootStack.Screen name={'ADD_SUBJECT'} component={AddSubjectScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
