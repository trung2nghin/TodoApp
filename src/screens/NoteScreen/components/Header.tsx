import React, { memo, useCallback } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

import { HeaderBar } from '../../components';
import { Colors } from '../../../assets';

const Header = () => {
  const { goBack } = useNavigation();

  const onNavGoBack = useCallback(() => {
    goBack();
  }, []);

  return (
    <HeaderBar
      right={
        <TouchableOpacity style={styles.left}>
          <Ionicons name="options" size={22} color={Colors.tangerineYellow} />
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
    justifyContent: 'space-between',
  },
  text: {
    fontFamily: 'Manrope-Medium',
    color: Colors.tangerineYellow,
    fontSize: 17,
    marginLeft: 2,
    textDecorationLine: 'underline',
  },
});

export default memo(Header);
