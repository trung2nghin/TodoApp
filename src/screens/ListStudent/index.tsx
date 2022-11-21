import { useNavigation } from '@react-navigation/native';
import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Colors, Metrics } from '../../assets';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';

import { ListStudentScreenProp } from '../../navigation/configs';
import { setStudentReload } from '../../redux/student/studentSlice';
import { getStudent } from '../../redux/student/studentThunk';
import { Student } from '../../types/student';

const ListStudentScreen: FC = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [onEndReachedCount, setOnEndReachedCount] = useState(1);
  const [begin, setBegin] = useState(false);
  const listRef = useRef(null);

  const { navigate } = useNavigation<ListStudentScreenProp>();
  const { loading, data } = useAppSelector(
    state => state.reducer.studentReducer,
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getStudent(onEndReachedCount));
  }, [onEndReachedCount]);

  const onEndReached = useCallback(() => {
    if (begin) {
      setOnEndReachedCount(prev => prev + 1);
      setBegin(false);
    }
  }, [begin]);

  const onMomentumScrollBegin = useCallback(() => {
    setBegin(true);
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    dispatch(setStudentReload());
    await dispatch(getStudent(1));
    setRefreshing(false);
  }, []);

  const renderItem = useCallback(
    ({ item }: { item: Student }) => {
      return (
        <TouchableOpacity
          onPress={() => navigate('STUDENT_INFO', { item })}
          style={styles.btnListChildContainer}>
          <Image
            source={{ uri: item?.avatar }}
            style={{ width: 76, height: 76, borderRadius: 2 }}
          />
          <View style={styles.viewTxtInfo}>
            <Text style={styles.txtInfo}>Name: {item?.name}</Text>
            <Text style={styles.txtInfo}>Age: {item?.age}</Text>
            <Text style={styles.txtInfo} numberOfLines={2}>
              Email: {item?.email}
            </Text>
            <Text style={styles.txtInfo}>
              Registered subject: {item?.subject?.length}
            </Text>
          </View>
        </TouchableOpacity>
      );
    },
    [data],
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text>ListStudentScreen</Text>
      <TouchableOpacity
        onPress={() => navigate('ADD_STUDENT')}
        style={{
          width: 100,
          height: 20,
          backgroundColor: 'blue',
        }}></TouchableOpacity>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        onEndReachedThreshold={0.5}
        onEndReached={onEndReached}
        onMomentumScrollBegin={onMomentumScrollBegin}
        style={styles.list}
        ListFooterComponent={() => {
          return (
            <View style={styles.viewFooter}>
              {loading && !refreshing && (
                <ActivityIndicator size="large" color={Colors.black} />
              )}
            </View>
          );
        }}
        ItemSeparatorComponent={() => (
          <View style={styles.viewSeparatorComponent}></View>
        )}
      />
    </SafeAreaView>
  );
};

export default ListStudentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.grey,
  },
  list: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 16,
  },
  btnListChildContainer: {
    width: '100%',
    maxWidth: '130%',
    height: Metrics.screen.height / 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 2,
    backgroundColor: Colors.white,
  },
  viewSeparatorComponent: { height: Metrics.screen.height / 36 },
  viewFooter: {
    width: Metrics.screen.width / 8,
    height: Metrics.screen.width / 8,
    alignSelf: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  viewTxtInfo: { width: '64%' },
  txtInfo: {
    fontSize: 13,
    color: Colors.black,
    textAlign: 'left',
    fontFamily: 'NotoSans-Medium',
  },
});
