import React, { useState, } from 'react';
import {
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
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

const Information = () => {
  const publishDate = new Date(detail.updatedAt);
  return (
    <View
      style={{
        backgroundColor: "#ffffff",
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderBottomWidth: .3,
        borderBottomColor: "#A6A6A6",
        marginBottom: 10,
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
  );
}

const MorgageCalculator = () => {
  const monthlyFee = (((detail.prices[0].max - (detail.prices[0].max/10)) * 1.045)/(35 * 12)).toFixed(0);
  return (
    <View
      style={{
        backgroundColor: "#ffffff",
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderBottomWidth: .3,
        borderBottomColor: "#A6A6A6",
        marginBottom: 10,
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <Icons iconName={"FontAwesome5"} name={"calculator"} style={{
        fontSize: 20,
        color: "#A6A6A6",
        paddingRight: 15,
      }} />
      <View
        style={{
          flex: 1,
        }}
      >
        <Text style={{ fontSize: 12, paddingBottom: 5, }}>{'Mortgage Calculator'}</Text>
        <Text style={{ fontWeight: "500", }}>{`RM ${numberWithCommas(monthlyFee)} per month`}</Text>
      </View>
      <Icons iconName={"SimpleLineIcons"} name={'arrow-right'} style={{ color: "#323232", fontSize: 20, }} />
    </View>
  );
}

const MoreDetail = () => {
  return (
    <View
      style={{
        backgroundColor: "#ffffff",
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderBottomWidth: .3,
        borderBottomColor: "#A6A6A6",
        marginBottom: 10,
      }}
    >
      <Text style={{ fontWeight: "500", }}>{detail.title}</Text>
      <Text
        style={{
          maxHeight: 100,
        }}
      >
        {detail.description}
      </Text>
      <TouchableOpacity
        style={{
          marginTop: 20,
        }}
      >
        <Text
          style={{
            fontWeight: "500",
            color: "#2B81C6",
          }}
        >{'READ MORE'}</Text>
      </TouchableOpacity>
    </View>
  )
}

const PropertyInformation = () => {
  const { attributes } = detail;
  return (
    <View
      style={{
        backgroundColor: "#ffffff",
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderBottomWidth: .3,
        borderBottomColor: "#A6A6A6",
        marginBottom: 10,
      }}
    >
      <Text style={{ fontWeight: "500", }}>{"Property Information"}</Text>
      <View
        style={{
          paddingVertical: 10,
        }}
      >
        <View
          style={{
            flexDirection:"row",
            paddingVertical: 5,
          }}
        >
          <Text style={{flex:1}}>{"Land Title Type"}</Text>
          <Text style={{flex:1}}>{attributes.landTitleType || '-'}</Text>
        </View>
        <View
          style={{
            flexDirection:"row",
            paddingVertical: 5,
          }}
        >
          <Text style={{flex:1}}>{"Tenure"}</Text>
          <Text style={{flex:1}}>{attributes.tenure || '-'}</Text>
        </View>
        <View
          style={{
            flexDirection:"row",
            paddingVertical: 5,
          }}
        >
          <Text style={{flex:1}}>{"Furnishing"}</Text>
          <Text style={{flex:1}}>{attributes.furnishing || '-'}</Text>
        </View>
        <View
          style={{
            flexDirection:"row",
            paddingVertical: 5,
          }}
        >
          <Text style={{flex:1}}>{"Unit Type"}</Text>
          <Text style={{flex:1}}>{attributes.unitType || '-'}</Text>
        </View>
        <View
          style={{
            flexDirection:"row",
            paddingVertical: 5,
          }}
        >
          <Text style={{flex:1}}>{"Occupancy"}</Text>
          <Text style={{flex:1}}>{attributes.occupancy || '-'}</Text>
        </View>
        <View
          style={{
            flexDirection:"row",
            paddingVertical: 5,
          }}
        >
          <Text style={{flex:1}}>{"Title Type"}</Text>
          <Text style={{flex:1}}>{attributes.titleType || '-'}</Text>
        </View>
      </View>
      <TouchableOpacity
      >
        <Text
          style={{
            fontWeight: "500",
            color: "#2B81C6",
          }}
        >{'MORE DETAILS'}</Text>
      </TouchableOpacity>
    </View>
  )
}

const Lister = () => {
  const lister = detail.listers[0];
  const organisation = detail.organisations[0];
  return (
    <>
    <View
      style={{
        backgroundColor: "#ffffff",
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderBottomWidth: .3,
        borderBottomColor: "#A6A6A6",
      }}
    >
      <Text
        style={{
          fontWeight: "500",
        }}
      >{organisation.name}</Text>
    </View>
    <View
      style={{
        backgroundColor: "#ffffff",
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderBottomWidth: .3,
        borderBottomColor: "#A6A6A6",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      {(lister.image||{}).thumbnailUrl && <Image source={{ uri: lister.image.thumbnailUrl }} style={{ width: 50, height: 50, borderRadius: 25, marginRight: 10, }} />}
      <View
        style={{
          flex: 1,
        }}
      >
        <Text style={{fontWeight: "500",}}>{lister.name}</Text>
        <Text>{lister.license || '-'}</Text>
      </View>
      <Icons iconName={"AntDesign"} name={"message1"} style={{ fontSize: 20, paddingHorizontal: 10, }} />
      <Icons iconName={"SimpleLineIcons"} name={"phone"} style={{ fontSize: 20, paddingHorizontal: 10, }} />
    </View>
    </>
  );
}

const Contact = () => {
  return (
    <View
      style={{
        backgroundColor: "#ffffff",
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderTopWidth: .3,
        borderTopColor: "#A6A6A6",
        borderBottomWidth: .3,
        borderBottomColor: "#A6A6A6",
        flexDirection: "row",
      }}
    >
      <TouchableWithoutFeedback>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          padding: 10,
          backgroundColor: "#2B81C6",
          borderRadius: 5,
          borderWidth: 1,
          borderColor: "#2B81C6",
          marginRight: 5,
        }}
      >
        <Text style={{ color: "#ffffff", fontWeight:"500", }}>{'Contact'}</Text>
      </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          padding: 10,
          backgroundColor: "#EFEFEF",
          borderRadius: 5,
          borderWidth: 1,
          borderColor: "#687786",
          marginLeft: 5,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Icons iconName={"FontAwesome5"} name={"whatsapp"} style={{ color:"#25d366", fontSize: 20, paddingRight: 10, }} />
          <Text>{'Whatsapp'}</Text>
        </View>
      </View>
      </TouchableWithoutFeedback>
    </View>
  )
}

const Detail = () => {
  return (
    <>
      <ImageCarousel />
      <Information />
      <MorgageCalculator />
      <MoreDetail />
      <PropertyInformation />
      <Lister />
    </>
  );
}

const PropertyDetailScreen = () => {
  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        <Header />
        <Detail />
      </ScrollView>
      <Contact />
    </>
  );
}

export default PropertyDetailScreen;