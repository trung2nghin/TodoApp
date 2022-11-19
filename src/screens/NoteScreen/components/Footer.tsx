import React, { FC, memo, useCallback } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';

import { HeaderBar } from '../../components';
import { Colors } from '../../../assets';

interface Props {
  color?: string;
  title?: string;
  onModal: (a: boolean) => void;
}

const Footer: FC<Props> = ({ color, title, onModal }) => {
  const navigation = useNavigation();
  const onAdd = useCallback(() => {
    onModal(true);
  }, []);

  return (
    <HeaderBar
      backgroundColor={color}
      title={<Text style={styles.text}>{title}</Text>}
      left={<TouchableOpacity style={styles.left}></TouchableOpacity>}
      right={
        <TouchableOpacity style={styles.right} onPress={onAdd}>
          <AntDesign
            name="addfolder"
            size={24}
            color={Colors.tangerineYellow}
          />
        </TouchableOpacity>
      }
    />
  );
};

const styles = StyleSheet.create({
  left: {
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: 4,
    width: '30%',
  },
  right: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: 4,
    width: '30%',
  },
  text: {
    width: '30%',
    textAlign: 'center',
    fontFamily: 'Manrope-Medium',
    color: Colors.grey,
    fontSize: 13,
  },
});

export default memo(Footer);
