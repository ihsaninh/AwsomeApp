import React, { useState, useContext } from 'react';
import {
  StyleSheet,
  Image,
  ImageBackground,
  Alert,
  StatusBar,
} from 'react-native';

import { Routes } from '../../constants/Routes';
import { Gap } from '../../components/Gap.component';
import { Button } from '../../components/Button.component';
import { TextField } from '../../components/TextField.component';
import { UserContext } from '../../context/User.context';
import { Images } from '../../constants/Images';
import { actionType } from '../../constants/ActionType';

const LoginScreen = ({ navigation }) => {
  const { dispatch } = useContext(UserContext);
  const [name, onChangeName] = useState('');
  const [palindrome, onChangePalindrome] = useState('');

  const checkPalindrome = () => {
    const removeChar = palindrome.replace(/[^A-Z0-9]/gi, '').toLowerCase();
    const checkPal = removeChar.split('').reverse().join('');

    if (removeChar === checkPal) {
      alertDialog('isPalindrome');
    } else {
      alertDialog('not palindrome');
    }
  };

  const navigateToHome = () => {
    dispatch({ type: actionType.ADD_USER_NAME, name });
    navigation.navigate(Routes.Home);
  };

  const alertDialog = message => {
    return Alert.alert('Alert', message, [
      { text: 'OK', onPress: () => console.log('OK Pressed') },
    ]);
  };

  return (
    <ImageBackground
      source={Images.background}
      resizeMode="cover"
      style={Styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent={true}
      />
      <Image source={Images.icPhoto} style={Styles.photo} />
      <Gap height={50} />
      <TextField onChangeText={onChangeName} text={name} placeholder="Name" />
      <TextField
        onChangeText={onChangePalindrome}
        text={palindrome}
        placeholder="Palindrome"
      />
      <Gap height={45} />
      <Button text="CHECK" onPress={checkPalindrome} />
      <Gap height={15} />
      <Button text="NEXT" onPress={navigateToHome} />
    </ImageBackground>
  );
};

export default LoginScreen;

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  photo: {
    height: 116,
    width: 116,
  },
});
