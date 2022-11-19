import React, { FC, useCallback } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { useDispatch } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { searchFolder } from '../../redux/folder/folderSlice';
import { Colors, Metrics } from '../../assets';

const SearchBar: FC = () => {
  const dispatch = useDispatch();
  const onChangeText = useCallback((text: string) => {
    dispatch(searchFolder(text));
  }, []);

  return (
    <View style={styles.container}>
      <Ionicons
        name="search"
        size={20}
        color={Colors.dimGray}
        style={styles.ic}
      />
      <TextInput
        placeholder="Search"
        onChangeText={onChangeText}
        placeholderTextColor={Colors.dimGray}
        cursorColor={Colors.tangerineYellow}
        style={styles.input}
      />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.neroGray,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderRadius: 8,
  },
  ic: { width: '8%', left: 8 },
  input: {
    color: Colors.white,
    alignItems: 'center',
    height: Metrics.screen.height / 20,
    borderRadius: 8,
    width: '92%',
  },
});
