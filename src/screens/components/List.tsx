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
import { Subject } from '../../types/subject';

interface Props {
  data: Array<Subject>;
}

const List: FC<Props> = ({ data }) => {
  console.log(data);

  const renderItem = ({ item }: { item: Subject }) => {
    return (
      <TouchableOpacity
        style={{
          width: 120,
          height: 120,
          backgroundColor: Colors.white,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={styles.txt}>{item.name}</Text>
        <Ionicons name="chevron-down" size={24} />
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

export default List;

const styles = StyleSheet.create({
  txt: {
    fontSize: 13,
    width: '90%',
    height: '40%',
    textAlign: 'center',
  },
});
