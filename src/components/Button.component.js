import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import React from 'react';

const Button = ({ text, onPress }) => {
  return (
    <TouchableOpacity
      style={Styles.container}
      onPress={onPress}
      activeOpacity={0.8}>
      <Text style={Styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

export { Button };

const Styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    backgroundColor: '#2B637B',
    alignItems: 'center',
    borderRadius: 12,
    width: '100%',
  },
  text: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: 'white',
  },
});
