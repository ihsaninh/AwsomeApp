import React from 'react';
import { StyleSheet, Image, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Routes } from '../constants/Routes';

const ListItem = ({ item }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={Styles.itemContent}
      activeOpacity={0.7}
      onPress={() => navigation.navigate(Routes.Home, { user: item })}>
      <Image source={{ uri: item.avatar }} style={Styles.itemImage} />
      <View style={Styles.itemInfo}>
        <Text style={Styles.itemName}>
          {item.first_name} {item.last_name}
        </Text>
        <Text style={Styles.itemEmail}>{item.email}</Text>
      </View>
    </TouchableOpacity>
  );
};

export { ListItem };

const Styles = StyleSheet.create({
  itemContent: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
  },
  itemImage: {
    height: 49,
    width: 49,
    borderRadius: 100,
  },
  itemInfo: {
    flexDirection: 'column',
    paddingLeft: 20,
  },
  itemName: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: 'black',
    lineHeight: 24,
  },
  itemEmail: {
    paddingTop: 4,
    fontSize: 10,
    fontFamily: 'Poppins-Medium',
    color: '#686777',
    textTransform: 'uppercase',
    lineHeight: 15,
  },
});
