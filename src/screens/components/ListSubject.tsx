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
  isDel?: boolean;
}

const ListSubject: FC<Props> = ({
  data,
  parentCallback,
  isStudentList,
  parentCallbackDelete,
  isDel,
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
          name={isStudentList ? 'chevron-up' : isDel ? 'close' : 'chevron-down'}
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
      ItemSeparatorComponent={() => <View style={styles.sepa} />}
      style={styles.list}
    />
  );
};

export default ListSubject;

const styles = StyleSheet.create({
  list: {
    width: '100%',
    height: 120,
    marginBottom: 24,
  },
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
  sepa: { width: 1 },
});
