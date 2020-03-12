import React, { useState } from 'react';
import {
  StatusBar,
  ScrollView,
  View,
  FlatList,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Text from '../components/texts';
import Icons from '../components/icons';
import { SCREENS } from '../navigations/constants';
import { numberWithCommas } from '../libs/numberUtils';
import propertySaved from '../../sample_data/property-saved';

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

const ListingBox = ({ item, navigation, }) => {
  return (
    <TouchableWithoutFeedback
      onPress={() => navigation.push(SCREENS.PROPERTY_DETAIL)}
    >
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
                    <Icons iconName={"FontAwesome5"}
                      name={i.icon} 
                      style={{ fontSize: 15, color: "#A5A5A5",   }} 
                    />
                  </View>
                  <Text>{item.attributes[i.label]}</Text>
                </View>
              ))
            }
          </View>
          <Icons iconName={"MaterialCommunityIcons"} name='star' style={{ fontSize: 25, color: "#F6B042", }} />
        </View>
      </View>
    </View>
    </TouchableWithoutFeedback>
  );
}

const SavedScreen = () => {
  useFocusEffect(() => {
    StatusBar.setBarStyle("dark-content")
  });
  const navigation = useNavigation();
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
        data={propertySaved}
        renderItem={({ item }) => ListingBox({ item, navigation, })}
      />
    </>
  )
}

export default SavedScreen