import React, { FC } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { HomeScreenProp } from '../../navigation/configs';
import { Colors } from '../../assets';

const HomeScreen: FC = () => {
  const { navigate } = useNavigation<HomeScreenProp>();

  return (
    <View style={styles.container}>
      <Text style={[styles.txt, styles.txtTitle]}>Student Management</Text>
      <TouchableOpacity
        style={[styles.btn]}
        onPress={() => {
          navigate('LIST_STUDENT');
        }}>
        <Text style={styles.txt}>Student</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.btn]}
        onPress={() => navigate('LIST_SUBJECT')}>
        <Text style={styles.txt}>Subject</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.grey,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    width: 240,
    height: 40,
    backgroundColor: Colors.black,
    justifyContent: 'center',
    marginBottom: 24,
  },
  txt: {
    fontSize: 17,
    color: Colors.white,
    textAlign: 'center',
  },
  txtTitle: {
    fontSize: 20,
    color: Colors.black,
    marginBottom: 24,
    textTransform: 'uppercase',
  },
});
