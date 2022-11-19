import React, { FC, memo, useCallback } from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import { useNavigation, useRoute } from '@react-navigation/native';

import { HeaderBar } from '../../components';
import { Metrics } from '../../../assets';
import { useDispatch } from 'react-redux';
import { editFolder } from '../../../redux/folder/folderSlice';

interface Props {
  left?: string;
  center?: string;
  color?: string;
  data: any;
  text?: string;
}

const Header: FC<Props> = ({ left, center, color, data, text }) => {
  const { goBack, navigate } = useNavigation();
  const dispatch = useDispatch();

  const onNavGoBack = useCallback(() => {
    goBack();
  }, []);

  const onEditChangeText = useCallback(() => {
    const editFolderObj = {
      ...data.noteData,
      desc: text,
    };
    dispatch(editFolder(editFolderObj));
    goBack();
  }, [text]);

  return (
    <HeaderBar
      left={
        <TouchableOpacity style={styles.left} onPress={onNavGoBack}>
          <Ionicons name="chevron-back" size={22} color={color} />
          <Text style={[styles.text, { color: color }]}>{left}</Text>
        </TouchableOpacity>
      }
      title={
        <View style={styles.viewTitle}>
          <Text style={[styles.textCenter, { color: color }]}>{center}</Text>
          <Octicons name="dot-fill" size={18} color={color} />
        </View>
      }
      right={
        <TouchableOpacity style={styles.right} onPress={onEditChangeText}>
          <Ionicons name="add-circle" size={22} color={color} />
        </TouchableOpacity>
      }
    />
  );
};

const styles = StyleSheet.create({
  left: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    width: Metrics.screen.width / 4,
  },
  right: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: Metrics.screen.width / 4,
  },
  text: {
    fontFamily: 'Manrope-Medium',
    fontSize: 17,
    marginLeft: 2,
    textDecorationLine: 'underline',
  },
  textCenter: {
    fontFamily: 'Manrope-Medium',
    fontSize: 16,
    marginRight: 6,
  },
  viewTitle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default memo(Header);
