import React, { useLayoutEffect, useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';

import { Images } from '../../constants/Images';
import { Routes } from '../../constants/Routes';
import { Button } from '../../components/Button.component';
import { UserContext } from '../../context/User.context';

const HomeScreen = ({ route, navigation }) => {
  const { state } = useContext(UserContext);
  const user = route?.params?.user;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.pop()}>
          <Image source={Images.arrowLeft} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <View style={Styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent={true}
      />
      <View style={Styles.content}>
        <View style={Styles.welcomeSection}>
          <Text style={Styles.welcome}>Welcome</Text>
          <Text style={Styles.name}>{state.name}</Text>
        </View>
        <View style={Styles.userSection}>
          <Image
            source={
              user?.avatar ? { uri: user.avatar } : Images.icUserPlaceHolder
            }
            style={Styles.userImage}
          />
          {!user ? (
            <Text style={Styles.noUserText}>
              Select a user to show the profile
            </Text>
          ) : (
            <>
              <Text style={Styles.userName}>
                {user.first_name} {user.last_name}
              </Text>
              <Text style={Styles.userEmail}>{user.email}</Text>
              <Text
                style={Styles.userWebsite}
                onPress={() => navigation.navigate(Routes.Webview)}>
                website
              </Text>
            </>
          )}
        </View>
        <View style={Styles.buttonSection}>
          <Button
            text="Choose a User"
            onPress={() => navigation.navigate(Routes.Users)}
          />
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
  },
  content: {
    flex: 1,
  },
  welcomeSection: {
    flex: 1,
  },
  welcome: {
    fontSize: 12,
    color: '#04021D',
    fontFamily: 'Poppins-Regular',
    lineHeight: 36,
  },
  name: {
    fontSize: 18,
    color: '#04021D',
    fontFamily: 'Poppins-SemiBold',
    lineHeight: 36,
  },
  userSection: {
    flex: 3,
    alignItems: 'center',
  },
  userImage: {
    height: 164,
    width: 164,
    borderRadius: 100,
  },
  noUserText: {
    fontSize: 18,
    lineHeight: 36,
    paddingTop: 35,
    fontFamily: 'Poppins-Medium',
  },
  buttonSection: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 16,
  },
  userName: {
    paddingTop: 53,
    fontSize: 24,
    fontFamily: 'Poppins-SemiBold',
    color: '#626166',
  },
  userEmail: {
    fontSize: 18,
    fontFamily: 'Poppins-Medium',
    paddingTop: 8,
    color: '#626166',
  },
  userWebsite: {
    textDecorationLine: 'underline',
    fontSize: 18,
    fontFamily: 'Poppins-Medium',
    paddingTop: 8,
    color: '#2B637B',
  },
});
