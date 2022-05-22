import { StyleSheet, View } from 'react-native';
import React from 'react';

const Gap = ({ height = 0, width = 0 }) => {
  return <View style={Styles.gap(height, width)} />;
};

export { Gap };

const Styles = StyleSheet.create({
  gap: (height, width) => ({
    height,
    width,
  }),
});
