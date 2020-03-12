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

import detail from '../../sample_data/property-details-page.json';
import Text from '../components/texts';
import Icons from '../components/icons';
import { numberWithCommas } from '../libs/numberUtils';

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
        <Icons iconName={"SimpleLineIcons"} name={'arrow-left'} style={{ color: "#323232", fontSize: 20, }} />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          paddingVertical: 5,
          paddingLeft: 10,
          marginVertical: 5,
        }}
      >
        <Icons iconName={"AntDesign"} name={'sharealt'} style={{ color: "#323232", fontSize: 25, }} />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          paddingVertical: 5,
          paddingLeft: 10,
          marginVertical: 5,
        }}
      >
        <Icons iconName={"MaterialCommunityIcons"} name={'star-outline'} style={{ color: "#323232", fontSize: 35, }} />
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
        // onViewableItemsChanged={onViewableItemsChanged}
        // viewabilityConfig={viewabilityConfig}
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

const convertSizeUnit = (sizeUnit) => {
  switch(sizeUnit) {
    case "SQUARE_FEET":
      return "sq. ft.";
    default:
      return sizeUnit;
  }
}

const convertMonth = (month) => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return months[month];
}

const Detail = () => {
  const publishDate = new Date(detail.updatedAt);
  return (
    <ScrollView>
      <ImageCarousel />
      <View
        style={{
          backgroundColor: "#ffffff",
          paddingVertical: 10,
          paddingHorizontal: 15,
          borderBottomWidth: .3,
          borderBottomColor: "#A6A6A6",
        }}
      >
        <Text style={{ fontWeight: "500", fontSize: 20, paddingBottom: 10, }}>{`RM ${numberWithCommas(detail.prices[0].max)}`}</Text>
        
        <View
          style={{
            paddingBottom: 10,
          }}
        >
          <Text style={{ fontWeight: "500", }}>{detail.title}</Text>
          <Text>{detail.address.formattedAddress}</Text>
        </View>

        <View
          style={{
            paddingBottom: 10,
          }}
        >
          <Text>{detail.propertyType}</Text>
          {detail.attributes.builtUp && <Text style={{ }}>{`Built-up Size: ${detail.attributes.builtUp} ${convertSizeUnit(detail.attributes.sizeUnit)}`}</Text>}
          {detail.attributes.landArea && <Text style={{ }}>{`Land Area: ${detail.attributes.landArea} ${convertSizeUnit(detail.attributes.sizeUnit)}`}</Text>}
        </View>
        <View
          style={{
            flexDirection: "row",
            flex: 1,
            alignItems: "flex-end",
            paddingBottom: 10,
          }}
        >
          {
              [{ label: "bedroom", icon: "bed", }, { label: "bathroom", icon: "bath", }, { label: "carPark", icon: "car", }].map(i => (
                detail.attributes[i.label] && <View style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  paddingRight: 10,
                }}
                key={i.label}
                >
                  <View
                    style={{
                      backgroundColor: "#F2F2F2",
                      padding: 5,
                      marginRight: 5,
                      borderRadius: 15,
                    }}
                  >
                    <Icons iconName={"FontAwesome5"}
                      name={i.icon} 
                      style={{ fontSize: 10, color: "#A5A5A5",   }} 
                    />
                  </View>
                  <Text style={{ fontWeight: "500", fontSize: 10, }}>{detail.attributes[i.label]}</Text>
                </View>
              ))
            }
          </View>
          <Text style={{ fontSize: 12, }}>{`Published on: ${publishDate.getDate()} ${convertMonth(publishDate.getMonth())} ${publishDate.getFullYear()}`}</Text>
      </View>
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