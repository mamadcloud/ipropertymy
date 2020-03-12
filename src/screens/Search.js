import React, { useState, } from 'react';
import {
  View,
  ScrollView,
  StatusBar,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
  FlatList,
} from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { SCREENS } from '../navigations/constants';

import Text from '../components/texts';
import { MaterialCommunityIcons, FontAwesome5, AntDesign, SimpleLineIcons, Ionicons, } from '../components/icons';
import { numberWithCommas } from '../libs/numberUtils';

const { width, height } = Dimensions.get("window");
const thumhnailHeight = width * .55;

const styles = {
  activeText: {
    color: "#2B81C6",
  },
  inactiveText: {
    color: "#687786",
  }
}
const PROPERTIES = [
  {
    channels: [ "sale" ],
    id: "sale-6820470",
    title: "Arcoris Soho, Mont Kiara",
    prices: [
      {
        type: "sale",
        currency: "MYR",
        max: 750000,
        min: 750000
      }
    ],
    propertyType: "Serviced Residence",
		cover: {
			type: "image",
			url: "https://pictures-my.ippstatic.com/realtors/images/640/34543/8c42876c5d7f4a6aa067d1dcb5679849.jpg",
			thumbnailUrl: "https://pictures-my.ippstatic.com/realtors/images/640/34543/8c42876c5d7f4a6aa067d1dcb5679849.jpg",
			urlTemplate: "https://img.rea-asia.com/my-subsale/premium/${width}x${height}-${scale}/realtors/images/640/34543/8c42876c5d7f4a6aa067d1dcb5679849.jpg"
    },
    attributes: {
			bathroom: "1",
			bedroom: "1",
			carPark: "1",
			builtUp: "700",
			landTitleType: "Residential",
			tenure: "Freehold",
			unitType: "SOHO",
			sizeUnit: "SQUARE_FEET"
    },
    address: {
			formattedAddress: "Jalan Kiara 4",
			lat: 3.166783,
			lng: 101.651499
		},
		multilanguagePlace: {
			"en-GB": {
				"level1": "Kuala Lumpur",
				"level2": "Mont Kiara",
				"level3": "Arcoris Soho"
			}
		},
  },
  {
    channels: [ "sale" ],
    id: "sale-6674935",
    title: "Burhanuddin Helmi, Ttdi, Kl, Kuala Lumpur, Taman Tun Dr Ismail",
    prices: [
      {
        type: "sale",
        currency: "MYR",
        max: 1030000,
        min: 1030000
      }
    ],
    propertyType: "1-sty Terrace/Link House",
		cover: {
			type: "image",
			url: "https://pictures-my.ippstatic.com/realtors/images/640/32434/b0d7210083a0495ea172e0684528363a.jpg",
			thumbnailUrl: "https://pictures-my.ippstatic.com/realtors/images/640/32434/b0d7210083a0495ea172e0684528363a.jpg",
			urlTemplate: "https://img.rea-asia.com/my-subsale/premium/${width}x${height}-${scale}/realtors/images/640/32434/b0d7210083a0495ea172e0684528363a.jpg"
    },
    attributes: {
      landArea: "24x80",
			bathroom: "2",
			bedroom: "3",
			carPark: "2",
			builtUp: "1,500",
      landTitleType: "Residential",
      furnishing: "Partly Furnished",
			tenure: "Freehold",
			unitType: "Intermediate",
			sizeUnit: "SQUARE_FEET"
		},
		"multilanguagePlace": {
			"en-GB": {
				"level1": "Kuala Lumpur",
				"level2": "Taman Tun Dr Ismail"
			}
		},
  },
  {
    channels: [ "sale" ],
    id: "sale-7463177",
    title: "Jalan Aminuddin Baki, Ttdi, Kl, Taman Tun Dr Ismail",
    prices: [
      {
        type: "sale",
        currency: "MYR",
        max: 4000000,
        min: 4000000
      }
    ],
    propertyType: "Bungalow",
		cover: {
			type: "image",
			url: "https://pictures-my.ippstatic.com/realtors/images/640/32434/a21c4dfde1be4321986b37734874e665.jpg",
			thumbnailUrl: "https://pictures-my.ippstatic.com/realtors/images/640/32434/a21c4dfde1be4321986b37734874e665.jpg",
			urlTemplate: "https://img.rea-asia.com/my-subsale/premium/${width}x${height}-${scale}/realtors/images/640/32434/a21c4dfde1be4321986b37734874e665.jpg"
    },
    attributes: {
      landArea: "7320",
			bathroom: "7",
			bedroom: "7+1",
			carPark: "6",
			builtUp: "6,032",
      landTitleType: "Residential",
      furnishing: "Partly Furnished",
			tenure: "Freehold",
			unitType: "Corner",
			sizeUnit: "SQUARE_FEET"
    },
    "multilanguagePlace": {
			"en-GB": {
				"level1": "Kuala Lumpur",
				"level2": "Taman Tun Dr Ismail"
			}
		},
  },
]

const convertSizeUnit = (sizeUnit) => {
  switch(sizeUnit) {
    case "SQUARE_FEET":
      return "sq. ft.";
    default:
      return sizeUnit;
  }
}

const SearchBox = ({ navigation }) => {
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
      }}
    > 
      <TouchableOpacity
        style={{
          paddingVertical: 5,
          paddingLeft: 10,
        }}
        onPress={() => navigation.goBack()}
      >
        <SimpleLineIcons name={'arrow-left'} style={{ color: "#323232", fontSize: 20, }} />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          paddingVertical: 10,
          paddingHorizontal: 5,
          alignItems: "center",
          flexDirection: "row",
          borderWidth: 1,
          borderColor: "#EFEFEF",
          margin: 10,
          borderRadius: 5,
          flex: 1,
        }}
      >
        <SimpleLineIcons name="magnifier" style={[styles.inactiveText, { fontSize: 15, paddingHorizontal: 10, }]} />
        <Text
          style={[{ color: "#323232", paddingLeft: 5, fontWeight: "500", }]}
        >{'Arcoris Soho'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const Filter = () => {
  return (
    <View
      style={{
        backgroundColor: "#FCFCFC",
        flexDirection: "row",
        alignItems: "center",
        borderBottomColor: "#E3E3E4",
        borderBottomWidth: 1,
      }}
    > 
      <TouchableOpacity
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          paddingVertical: 10,
          flexDirection: "row",
        }}
      >
        <Ionicons name={'md-switch'} style={{ color: "#323232", fontSize: 15, paddingRight: 10, }} />
        <Text>{'FILTER'}</Text>
      </TouchableOpacity>
      <View style={{
        borderLeftWidth: 1,
        height: 15,
      }} />
      <TouchableOpacity
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          paddingVertical: 10,
          flexDirection: "row",
        }}
      >
        <AntDesign name={'menuunfold'} style={{ color: "#323232", fontSize: 13, paddingRight: 10, }} />
        <Text>{'SORT'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const ResultCard = ({ item, navigation, }) => {
  return (
    <View
      style={{
        marginTop: 10,
      }}
    >
      <TouchableWithoutFeedback
        onPress={() => navigation.push(SCREENS.PROPERTY_DETAIL)}
      >
        <View>
          <Image source={{ uri: item.cover.url, }} style={{ height: thumhnailHeight, }} />
          <View
            style={{
              backgroundColor: "#ffffff",
              padding: 15,
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "500", }}>{`RM ${numberWithCommas(item.prices[0].max)}`}</Text>
            <Text numberOfLines={1} style={{ paddingTop: 10, fontSize: 18, fontWeight: "500", }}>{item.title}</Text>
            {(item.address||{}).formattedAddress && <Text numberOfLines={1}>{(item.address||{}).formattedAddress}</Text>}
            <Text style={{ paddingTop: 10, }}>{item.propertyType}</Text>
            {item.attributes.builtUp && <Text style={{ }}>{`Built-up Size: ${item.attributes.builtUp} ${convertSizeUnit(item.attributes.sizeUnit)}`}</Text>}
            {item.attributes.landArea && <Text style={{ }}>{`Land Area: ${item.attributes.landArea} ${convertSizeUnit(item.attributes.sizeUnit)}`}</Text>}
            {item.attributes.furnishing && <Text style={{ }}>{`Furnishing: ${item.attributes.furnishing}`}</Text>}
            <View
              style={{
                flexDirection: "row",
                flex: 1,
                alignItems: "flex-end",
                paddingTop: 10,
              }}
            >
            <View
              style={{
                flexDirection: "row",
                flex: 1,
                alignItems: "flex-end",
              }}
            >
              {
                  [{ label: "bedroom", icon: "bed", }, { label: "bathroom", icon: "bath", }, { label: "carPark", icon: "car", }].map(i => (
                    item.attributes[i.label] && <View style={{
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
                        <FontAwesome5 
                          name={i.icon} 
                          style={{ fontSize: 15, color: "#A5A5A5",   }} 
                        />
                      </View>
                      <Text>{item.attributes[i.label]}</Text>
                    </View>
                  ))
                }
              </View>
              <MaterialCommunityIcons name='star-outline' style={{ fontSize: 25, color: "#F6B042", }} />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const Result = () => {
  const navigation = useNavigation();
  return (
    <FlatList
      ListHeaderComponent={() => (
        <>
        <SearchBox 
          navigation={navigation}
        />
        <Filter />
        </>
      )}
      renderItem={({ item }) => ResultCard({ item, navigation, }) }
      data={PROPERTIES}
    />
  );
}

const SearchSearch = () => {
  return (
    <>
      <StatusBar barStyle={"dark-content"} />
      <Result />
    </>
  );
}

export default SearchSearch;