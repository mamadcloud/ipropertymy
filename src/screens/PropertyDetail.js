import React, { useState, } from 'react';
import {
  View,
  TouchableOpacity,
  Dimensions,
  Image,
  ScrollView,
  FlatList,
} from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons, FontAwesome5, AntDesign, SimpleLineIcons, Ionicons, } from '../components/icons';

import detail from '../../assets/property-details-page.json';
import Text from '../components/texts';

const { width, height } = Dimensions.get("window");
const thumhnailHeight = width * .60;

const Header = () => {
  const navigation = useNavigation();
  const insets = useSafeArea();

  return (
    <View
      style={{
        backgroundColor: "#ffffff",
        paddingTop: insets.top,
        flexDirection: "row",
        alignItems: "center",
        borderBottomColor: "#EBEBEB",
        borderBottomWidth: 1,
        height: 80,
        paddingHorizontal: 10,
      }}
    > 
      <TouchableOpacity
        style={{
          paddingVertical: 5,
          marginVertical: 5,
          flex: 1,
        }}
        onPress={() => navigation.goBack()}
      >
        <SimpleLineIcons name={'arrow-left'} style={{ color: "#323232", fontSize: 20, }} />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          paddingVertical: 5,
          paddingLeft: 10,
          marginVertical: 5,
        }}
      >
        <AntDesign name={'sharealt'} style={{ color: "#323232", fontSize: 25, }} />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          paddingVertical: 5,
          paddingLeft: 10,
          marginVertical: 5,
        }}
      >
        <MaterialCommunityIcons name={'star-outline'} style={{ color: "#323232", fontSize: 35, }} />
      </TouchableOpacity>
    </View>
  );
}

let imageIndex = 1;
const onViewableItemsChanged = ({ viewableItems, changed }) => imageIndex = viewableItems[0].index + 1;
const viewabilityConfig = {
  itemVisiblePercentThreshold: 50,
};

const ImageCarousel = () => {
  const [_, setIndex] = useState(imageIndex)

  return (
    <View>
      <FlatList
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        horizontal
        renderItem={({ item }) => {
          return (<Image
            source={{ uri: item.url }}
            style={{
              width,
              height: thumhnailHeight,
            }}
          />)
        }}
        keyExtractor={(item, index) => `${item.type}-${index}`}
        onMomentumScrollEnd={() => setIndex(imageIndex)}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        data={detail.medias}
      />
      <View
        style={{
          position: "absolute",
          alignSelf: "flex-end",
          bottom: 15,
          right: 15,
          paddingVertical: 5,
          paddingHorizontal: 10,
          borderRadius: 15,
          backgroundColor: 'rgba(0,0,0,.5)',
        }}
      >
        <Text style={{ color: "#ffffff", fontWeight: "500", }}>{`${imageIndex}/${detail.medias.length}`}</Text>
      </View>
    </View>
  );
}

const Detail = () => {
  return (
    <ScrollView>
      <ImageCarousel />
      <Text>{'SAPI'}</Text>
    </ScrollView>
  );
}

const PropertyDetailScreen = () => {
  return (
    <>
      <Header />
      <Detail />
    </>
  );
}

export default PropertyDetailScreen;