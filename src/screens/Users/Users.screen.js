import React, {
  useState,
  useEffect,
  useMemo,
  useRef,
  useCallback,
  useLayoutEffect,
} from 'react';
import {
  Text,
  View,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import BottomSheetView from '@gorhom/bottom-sheet';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';

import { Routes } from '../../constants/Routes';
import { ListItem } from '../../components/ListItem.component';
import { Button } from '../../components/Button.component';
import { Gap } from '../../components/Gap.component';
import { Images } from '../../constants/Images';

const UsersScreen = ({ navigation }) => {
  const mapView = useRef(null);
  const bottomSheetRef = useRef(null);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState({});
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isMaps, setIsMaps] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers, page]);

  const snapPoints = useMemo(() => ['32%'], []);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    const response = await fetch(
      `https://reqres.in/api/users?page=${page}&per_page=10`,
    );
    const json = await response.json();
    const newUsers = json.data.map(user => {
      return {
        ...user,
        latitude: getRandomRange(-6.51, -6.59, 7),
        longitude: getRandomRange(106.8, 106.82, 7),
      };
    });

    setUsers([...users, ...newUsers]);
    setLoading(false);
  }, [page, users]);

  const onShowMaps = useCallback(() => {
    bottomSheetRef.current.close();
    setIsMaps(!isMaps);
  }, [isMaps]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.pop()}>
          <Image source={Images.arrowLeft} />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity onPress={onShowMaps}>
          <Image
            source={isMaps ? Images.icShowList : Images.icMap}
            style={Styles.mapIcon}
          />
        </TouchableOpacity>
      ),
    });
  }, [isMaps, navigation, onShowMaps]);

  const loadMore = () => {
    setPage(page + 1);
  };

  const getRandomRange = (from, to, fixed) => {
    return Number((Math.random() * (to - from) + from).toFixed(fixed));
  };

  const openBottomSheet = item => () => {
    setSelectedUser(item);
    setTimeout(() => {
      bottomSheetRef.current.snapToIndex(0);
    }, 300);
  };

  const renderItem = ({ item }) => {
    return <ListItem item={item} />;
  };

  const itemSeparatorView = () => {
    return <View style={Styles.separator} />;
  };

  const renderFlatList = () => {
    return (
      <FlatList
        data={users}
        onRefresh={fetchUsers}
        refreshing={loading}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        onEndReached={loadMore}
        onEndReachedThreshold={0.7}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={itemSeparatorView}
      />
    );
  };

  const renderMaps = () => {
    return (
      <MapView
        ref={mapView}
        provider={PROVIDER_GOOGLE}
        style={Styles.map}
        initialRegion={{
          latitude: -6.5141387,
          longitude: 106.8296376,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
        showsCompass={false}
        showsUserLocation
        maxZoomLevel={100}>
        {users.map((item, idx) => {
          return (
            <Marker
              key={idx}
              onPress={openBottomSheet(item)}
              coordinate={{
                latitude: item.latitude,
                longitude: item.longitude,
              }}
            />
          );
        })}
      </MapView>
    );
  };

  return (
    <View style={Styles.container}>
      {isMaps ? renderMaps() : renderFlatList()}
      <BottomSheetView
        ref={bottomSheetRef}
        index={-1}
        enableContentPanningGesture
        enableHandlePanningGesture
        enablePanDownToClose
        handleIndicatorStyle={Styles.indicator}
        snapPoints={snapPoints}>
        <View style={Styles.contentContainer}>
          <Image source={{ uri: selectedUser.avatar }} style={Styles.avatar} />
          <Text style={Styles.userName}>
            {selectedUser.first_name} {selectedUser.last_name}
          </Text>
          <Gap height={32} />
          <Button
            text="Select"
            onPress={() =>
              navigation.navigate(Routes.Home, { user: selectedUser })
            }
          />
        </View>
      </BottomSheetView>
    </View>
  );
};

export default UsersScreen;

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  mapIcon: {
    height: 20,
    width: 20,
  },
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  userName: {
    paddingTop: 15,
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
  },
  avatar: {
    height: 84,
    width: 84,
    borderRadius: 100,
  },
  indicator: {
    backgroundColor: 'transparent',
  },
});
