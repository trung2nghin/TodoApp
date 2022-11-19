import React, {FC, memo} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {View, StyleSheet, StatusBarProps, StatusBar} from 'react-native';
import {Colors} from '../../assets';

interface Props {
  children: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  bodyColor?: string;
  statusBarColor?: string;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const Container: FC<Props & StatusBarProps> = ({
  children,
  header,
  footer,
  bodyColor,
  statusBarColor,
  ...statusBarProps
}) => (
  <View style={styles.container}>
    <StatusBar
      translucent
      barStyle="light-content"
      {...statusBarProps}
      backgroundColor={statusBarColor || Colors.black}
    />
    <SafeAreaView
      edges={['right', 'left', 'top']}
      style={{backgroundColor: statusBarColor || Colors.black}}>
      {header}
    </SafeAreaView>
    <View
      style={[styles.container, {backgroundColor: bodyColor || Colors.black}]}>
      <SafeAreaView
        edges={header ? ['right', 'left'] : ['right', 'left', 'top']}
        style={styles.container}>
        {children}
      </SafeAreaView>
      {footer ? (
        <SafeAreaView edges={['right', 'left', 'bottom']}>
          {footer}
        </SafeAreaView>
      ) : null}
    </View>
  </View>
);

export default memo<Props & StatusBarProps>(Container);
