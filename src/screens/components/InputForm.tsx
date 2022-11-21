import React, { FC } from 'react';
import { TextInput } from 'react-native';
import { useForm, Controller, Resolver } from 'react-hook-form';

import { StyleSheet, Text, View } from 'react-native';
import { Colors } from '../../assets';

interface Props {
  control?: any;
  rules?: any;
  name: string;
  error?: string;
  placeholder: string;
}

const InputForm: FC<Props> = ({ control, rules, name, error, placeholder }) => {
  return (
    <View
      style={[
        error ? { ...styles.container, marginBottom: 32 } : styles.container,
      ]}>
      <Controller
        control={control}
        rules={rules}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={`${value}`}
            placeholder={placeholder}
          />
        )}
        name={name}
      />
      {error && <Text style={styles.txt}>{error}</Text>}
    </View>
  );
};

export default InputForm;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 40,
    marginBottom: 20,
  },
  input: {
    backgroundColor: Colors.white,
    width: '100%',
    height: 40,
    padding: 10,
    borderRadius: 2,
  },
  txt: {
    fontSize: 13,
    color: Colors.red,
  },
});
