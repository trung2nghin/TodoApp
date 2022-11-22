import { useNavigation } from '@react-navigation/native';
import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Colors, Metrics } from '../../assets';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { ListSubjectScreenProp } from '../../navigation/configs';
import { getSubject } from '../../redux/subject/subjectThunk';
import { setSubjectReload } from '../../redux/subject/subjectSlice';
import { Subject } from '../../types/subject';

const ListSubjectScreen: FC = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [onEndReachedCount, setOnEndReachedCount] = useState(1);
  const [begin, setBegin] = useState(false);

  const { navigate, goBack } = useNavigation<ListSubjectScreenProp>();
  const { loading, data } = useAppSelector(
    state => state.reducer.subjectReducer,
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getSubject());
  }, [onEndReachedCount]);

  const onMomentumScrollBegin = useCallback(() => {
    setBegin(true);
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    dispatch(setSubjectReload());
    if (onEndReachedCount === 1) {
      await dispatch(getSubject());
    } else {
      setOnEndReachedCount(1);
    }
    setRefreshing(false);
  }, [onEndReachedCount]);

  const renderItem = useCallback(
    ({ item }: { item: Subject }) => {
      return (
        <TouchableOpacity
          onPress={() => navigate('SUBJECT_INFO', { item })}
          style={styles.btnListChildContainer}>
          <Text style={styles.txtInfo}>Name: {item?.name}</Text>
          <Text style={styles.txtInfo}>Teacher: {item?.teacher}</Text>
          <Text style={styles.txtInfo} numberOfLines={2}>
            Classroom: {item?.classroom}
          </Text>
          {/* <Text style={styles.txtInfo}>
            Registered student: {item?.student?.length}
          </Text> */}
        </TouchableOpacity>
      );
    },
    [data],
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            goBack(), dispatch(setSubjectReload());
          }}>
          <Ionicons name={'chevron-back'} size={30} color={Colors.black} />
        </TouchableOpacity>
        <Text style={styles.txt}>LIST SUBJECT</Text>
        <TouchableOpacity
          onPress={() => {
            navigate('ADD_SUBJECT');
            dispatch(setSubjectReload());
          }}>
          <Ionicons name={'add-circle'} size={24} color={Colors.black} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
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

export default ListSubjectScreen;

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
    height: Metrics.screen.height / 5,
    maxHeight: Metrics.screen.height / 5,
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
    width: '90%',
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
  txt: {
    fontSize: 17,
    color: Colors.black,
    textAlign: 'center',
  },
});
