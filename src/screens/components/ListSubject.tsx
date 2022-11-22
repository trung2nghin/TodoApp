import React, { FC, useCallback } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Colors } from '../../assets';
import { Subject } from '../../types/subject';

interface Props {
  data: Array<Subject>;
  parentCallback?: (item: Subject) => void;
  parentCallbackDelete?: (item: Subject) => void;
  isStudentList?: boolean;
}

const ListSubject: FC<Props> = ({
  data,
  parentCallback,
  isStudentList,
  parentCallbackDelete,
}) => {
  const onAddSubject = useCallback((item: Subject) => {
    !!parentCallback && parentCallback(item);
    !!parentCallbackDelete && parentCallbackDelete(item);
  }, []);

  const renderItem = ({ item }: { item: Subject }) => {
    return (
      <TouchableOpacity style={styles.btn} onPress={() => onAddSubject(item)}>
        {!isStudentList && <Text style={styles.txt}>{item.name}</Text>}
        <Ionicons
          name={isStudentList ? 'chevron-up' : 'chevron-down'}
          size={24}
        />
        {isStudentList && <Text style={styles.txt}>{item.name}</Text>}
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      showsHorizontalScrollIndicator={false}
      horizontal
      ItemSeparatorComponent={() => <View style={{ width: 1 }} />}
      style={{
        width: '100%',
        height: 120,
        marginBottom: 24,
      }}
    />
  );
};

export default ListSubject;

const styles = StyleSheet.create({
  txt: {
    fontSize: 13,
    width: '90%',
    height: '40%',
    textAlign: 'center',
  },
  btn: {
    width: 120,
    height: 120,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
