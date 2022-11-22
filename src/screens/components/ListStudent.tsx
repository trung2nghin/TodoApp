import React, { FC } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Colors } from '../../assets';
import { Student } from '../../types/student';

interface Props {
  data: Array<Student>;
}

const ListStudent: FC<Props> = ({ data }) => {
  const renderItem = ({ item }: { item: Student }) => {
    return (
      <TouchableOpacity
        style={{
          width: 120,
          height: 120,
          backgroundColor: Colors.white,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Ionicons name="chevron-up" size={24} />
        <Text style={styles.txt}>{item.name}</Text>
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

export default ListStudent;

const styles = StyleSheet.create({
  txt: {
    fontSize: 13,
    width: '90%',
    height: '40%',
    textAlign: 'center',
  },
});
