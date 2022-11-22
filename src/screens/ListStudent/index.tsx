import { useIsFocused, useNavigation } from '@react-navigation/native';
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

  const { navigate, goBack, replace } = useNavigation<ListStudentScreenProp>();
  const isFocus = useIsFocused();
  const { loading, dataStudent } = useAppSelector(
    state => state.reducer.studentReducer,
  );
  const dispatch = useAppDispatch();
  console.log(dataStudent.length, onEndReachedCount);

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
    if (onEndReachedCount === 1) {
      await dispatch(getStudent(1));
    } else {
      setOnEndReachedCount(1);
    }
    setRefreshing(false);
  }, [onEndReachedCount]);

  const renderItem = useCallback(
    ({ item }: { item: Student }) => {
      return (
        <TouchableOpacity
          onPress={() => navigate('STUDENT_INFO', { item })}
          style={styles.btnListChildContainer}>
          <Image source={{ uri: item?.avatar }} style={styles.img} />
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
    [dataStudent],
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            goBack(), dispatch(setStudentReload());
          }}>
          <Text>Back</Text>
        </TouchableOpacity>
        <Text>LIST STUDENT</Text>
        <TouchableOpacity
          onPress={() => {
            navigate('ADD_STUDENT');
            dispatch(setStudentReload());
          }}>
          <Text>ADD</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={dataStudent}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
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
    paddingHorizontal: 16,
  },
  list: {
    flex: 1,
    width: '100%',
  },
  btnListChildContainer: {
    width: '100%',
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
  header: {
    width: '100%',
    height: Metrics.screen.height / 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  img: { width: 76, height: 76, borderRadius: 2 },
});
