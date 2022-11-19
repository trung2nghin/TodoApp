import { useRoute } from '@react-navigation/native';
import React, { FC, useCallback, useMemo, useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

import { Colors } from '../../assets';
import { DetailScreenRouteProp } from '../../navigation/configs';
import { Container } from '../components';
import Header from './components/Header';

const DetailScreen: FC = () => {
  const { params } = useRoute<DetailScreenRouteProp>();
  const [text, setText] = useState<string>(params.noteData.desc);

  const onChangeText = useCallback((text: string) => {
    setText(text);
  }, []);

  const colorPriority = useMemo(() => {
    let priorityUppercase = params.noteData.priority?.toUpperCase();
    let ColorPicker =
      priorityUppercase === 'LOW'
        ? Colors.neonBlue
        : priorityUppercase === 'HIGH'
        ? Colors.red
        : Colors.tangerineYellow;
    return ColorPicker;
  }, []);

  return (
    <Container
      header={
        <Header
          left={params.noteData.title}
          center={params.noteData.createAt}
          color={colorPriority}
          data={params}
          text={text}
        />
      }>
      <View style={styles.container}>
        <TextInput
          value={text}
          onChangeText={text => onChangeText(text)}
          autoFocus
          multiline
          textAlignVertical="top"
          cursorColor={colorPriority}
          style={styles.input}
        />
      </View>
    </Container>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 16 },
  txtContainer: {
    fontFamily: 'Manrope-ExtraBold',
    color: Colors.white,
    fontSize: 32,
    marginBottom: 8,
  },
  input: { flex: 1, fontSize: 18, color: Colors.white },
});
