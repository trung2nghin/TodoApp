import React, { FC, memo } from 'react';
import { View, StyleSheet } from 'react-native';

import { Colors } from '../../assets';

interface Props {
  backgroundColor?: string;
  left?: React.ReactNode;
  right?: React.ReactNode;
  title?: React.ReactNode;
}

const HeaderBar: FC<Props> = ({ backgroundColor, title, left, right }) => (
  <View
    style={[
      styles.container,
      { backgroundColor: backgroundColor || Colors.black },
    ]}>
    {left || <View />}
    {title}
    {right || <View />}
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    height: 50,
    justifyContent: 'space-between',
    paddingHorizontal: 12,
  },
});

export default memo<Props>(HeaderBar);
