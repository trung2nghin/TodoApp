import { useNavigation } from '@react-navigation/native';
import React, { FC, useCallback, useEffect } from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { ListSubjectScreenProp } from '../../navigation/configs';
import { getSubject } from '../../redux/subject/subjectThunk';
import { Subject } from '../../types/subject';

const ListSubjectScreen: FC = () => {
  const { navigate } = useNavigation<ListSubjectScreenProp>();

  const { loading, data } = useAppSelector(
    state => state.reducer.subjectReducer,
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getSubject());
  }, []);

  const renderItem = useCallback(
    ({ item }: { item: Subject }) => {
      return (
        <TouchableOpacity
          onPress={() => navigate('SUBJECT_INFO', { item })}
          style={styles.viewListChildContainer}>
          <Text>{item?.name}</Text>
        </TouchableOpacity>
      );
    },
    [data],
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text>ListSubjectScreen</Text>
      <TouchableOpacity
        onPress={() => navigate('ADD_SUBJECT')}
        style={{
          width: 100,
          height: 20,
          backgroundColor: 'blue',
        }}></TouchableOpacity>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

export default ListSubjectScreen;

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center' },
  viewListChildContainer: {},
});
