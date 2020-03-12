import React, { useState } from 'react';
import {
  StatusBar,
  ScrollView,
  View,
  FlatList,
  Image,
  Dimensions,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Text from '../components/texts';
import { MaterialCommunityIcons, FontAwesome5, } from '../components/icons';
import { numberWithCommas } from '../libs/numberUtils';

const { width, height } = Dimensions.get("window");
const thumbnailWidth = width * .3;
const thumhnailHeight = thumbnailWidth * .85;

const styles = {
  activeText: {
    color: "#2B81C6",
  },
  inactiveText: {
    color: "#687786",
  }
}

const SAVED_PROPERTIES = [
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
  },
]

const ListingBox = ({ item, }) => {
  return (
    <View
      style={{
        paddingVertical: 10,
        paddingHorizontal: 15,
        flexDirection: "row",
      }}
    >
      <Image 
        source={{ uri: item.cover.url }} 
        style={{
          width: thumbnailWidth,
          height: thumhnailHeight,
          borderRadius: 5,
          borderWidth: .3,
          borderColor: "#A6A6A6"
        }}
      />
      <View
        style={{
          paddingTop: 10,  
          paddingHorizontal: 10,   
          flex: 1, 
        }}
      >
        <Text>{`RM ${numberWithCommas(item.prices[0].max)}`}</Text>
        <Text style={{ fontWeight: "500" }} numberOfLines={1} ellipsizeMode={'tail'}>{item.title}</Text>
        <Text style={styles.inactiveText} numberOfLines={1} ellipsizeMode={'tail'}>{item.propertyType}</Text>
        <View
          style={{
            flexDirection: "row",
            flex: 1,
            alignItems: "flex-end",
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
          <MaterialCommunityIcons name='star' style={{ fontSize: 25, color: "#F6B042", }} />
        </View>
      </View>
    </View>
  );
}

const SavedScreen = () => {
  useFocusEffect(() => {
    StatusBar.setBarStyle("dark-content")
  });
  return (
    <>
      <View style={{
        backgroundColor: "#ffffff",
        height: 20,
        borderBottomWidth: .3,
        borderBottomColor: "#A6A6A6"
      }}>
        <StatusBar 
          barStyle="dark-content"
        />
      </View>
      <FlatList
        ItemSeparatorComponent={() => <View style={{ borderBottomWidth: .7, borderBottomColor: "#687786" }} />}
        style={{
          backgroundColor: "#ffffff",
        }}
        data={SAVED_PROPERTIES}
        renderItem={ListingBox}
      />
    </>
  )
}

export default SavedScreen