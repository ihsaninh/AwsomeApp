import { StyleSheet, TextInput } from 'react-native';
import React from 'react';

const TextField = ({ onChangeText, text, placeholder }) => {
  return (
    <TextInput
      style={Styles.input}
      onChangeText={onChangeText}
      value={text}
      placeholder={placeholder}
    />
  );
};

export { TextField };

const Styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    padding: 10,
    width: '100%',
    backgroundColor: 'white',
    borderWidth: 0,
    borderRadius: 12,
    fontFamily: 'Poppins-Medium',
    paddingHorizontal: 20,
  },
});
