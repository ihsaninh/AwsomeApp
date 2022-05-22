import { TouchableOpacity, Image } from 'react-native';
import React, { useLayoutEffect } from 'react';
import { WebView } from 'react-native-webview';
import { Images } from '../../constants/Images';

const WebviewScreen = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.pop()}>
          <Image source={Images.arrowLeft} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);
  return <WebView source={{ uri: 'https://suitmedia.com/' }} />;
};

export default WebviewScreen;
