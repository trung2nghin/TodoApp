import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { RootStackParamList } from './configs';
import { DetailScreen, NoteScreen } from '../screens';

const RootStack = createStackNavigator<RootStackParamList>();

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <RootStack.Screen name={'NOTE'} component={NoteScreen} />
        <RootStack.Screen name={'DETAIL'} component={DetailScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
