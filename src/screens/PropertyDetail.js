import React, { useState, useContext } from 'react';
import {
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
  Image,
  ScrollView,
  FlatList,
  StyleSheet,
} from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import Text from 'components/Text';
import Icons from 'components/Icons';
import { numberWithCommas } from 'libs/numberUtils';

import { ListingContext, ShortlistContext, } from 'contexts';

const { width, height } = Dimensions.get('window');
const thumhnailHeight = width * .60;

const styles = StyleSheet.create({
  headerWrapper: {
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#EBEBEB',
    borderBottomWidth: 1,
    height: 80,
    paddingHorizontal: 10,
  },
  headerBackButtonWrapper: {
    paddingVertical: 5,
    marginVertical: 5,
    flex: 1,
  },
  headerRightButton: {
    paddingVertical: 5,
    paddingLeft: 10,
    marginVertical: 5,
  },
  headerIcon: {
    color: '#323232'
  },
  sectionWrapper: {
    backgroundColor: '#ffffff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: .3,
    borderBottomColor: '#A6A6A6',    
  }
})

const Header = ({ detail, }) => {
  const navigation = useNavigation();
  const insets = useSafeArea();
  const shortlistContext = useContext(ShortlistContext);
  const shortlisted = shortlistContext.items && shortlistContext.items.map(x => x.id).indexOf(detail.id) > -1;

  return (
    <View
      style={[styles.headerWrapper, { paddingTop: insets.top, }]}
    > 
      <TouchableOpacity
        style={styles.headerBackButtonWrapper}
        onPress={() => navigation.goBack()}
      >
        <Icons iconName={'SimpleLineIcons'} name={'arrow-left'} style={[styles.headerIcon, { fontSize: 20, }]} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.headerRightButton}
      >
        <Icons iconName={'AntDesign'} name={'sharealt'} style={[styles.headerIcon, { fontSize: 25, }]} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.headerRightButton}
        onPress={() => {
          shortlistContext.setShortlist(detail);
        }}
      >
        <Icons iconName={'MaterialCommunityIcons'} name={shortlisted ? 'star' : 'star-outline'} style={[styles.headerIcon, { fontSize: 35, color: shortlisted ? '#F6B042' : '#000000', }]} />
      </TouchableOpacity>
    </View>
  );
}

const convertSizeUnit = (sizeUnit) => {
  switch(sizeUnit) {
    case 'SQUARE_FEET':
      return 'sq. ft.';
    default:
      return sizeUnit;
  }
}

const convertMonth = (month) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return months[month];
}

let imageIndex = 1;
const onViewableItemsChanged = ({ viewableItems, changed }) => imageIndex = viewableItems[0].index + 1;
const viewabilityConfig = {
  itemVisiblePercentThreshold: 50,
};

const ImageCarousel = ({ detail })  => {
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
          position: 'absolute',
          alignSelf: 'flex-end',
          bottom: 15,
          right: 15,
          paddingVertical: 5,
          paddingHorizontal: 10,
          borderRadius: 15,
          backgroundColor: 'rgba(0,0,0,.5)',
        }}
      >
        <Text style={{ color: '#ffffff', fontWeight: '500', }}>{`${imageIndex}/${detail.medias.length}`}</Text>
      </View>
    </View>
  );
}

const Information = ({ detail })  => {
  const publishDate = new Date(detail.updatedAt);
  return (
    <View
      style={[styles.sectionWrapper, { marginBottom: 10, }]}
    >
      <Text style={{ fontWeight: '500', fontSize: 20, paddingBottom: 10, }}>{`RM ${numberWithCommas(detail.prices[0].max)}`}</Text>
      
      <View
        style={{
          paddingBottom: 10,
        }}
      >
        <Text style={{ fontWeight: '500', }}>{detail.title}</Text>
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
          flexDirection: 'row',
          flex: 1,
          alignItems: 'flex-end',
          paddingBottom: 10,
        }}
      >
        {
            [{ label: 'bedroom', icon: 'bed', }, { label: 'bathroom', icon: 'bath', }, { label: 'carPark', icon: 'car', }].map(i => (
              detail.attributes[i.label] && <View style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                paddingRight: 10,
              }}
              key={i.label}
              >
                <View
                  style={{
                    backgroundColor: '#F2F2F2',
                    padding: 5,
                    marginRight: 5,
                    borderRadius: 15,
                  }}
                >
                  <Icons iconName={'FontAwesome5'}
                    name={i.icon} 
                    style={{ fontSize: 10, color: '#A5A5A5',   }} 
                  />
                </View>
                <Text style={{ fontWeight: '500', fontSize: 10, }}>{detail.attributes[i.label]}</Text>
              </View>
            ))
          }
        </View>
        <Text style={{ fontSize: 12, }}>{`Published on: ${publishDate.getDate()} ${convertMonth(publishDate.getMonth())} ${publishDate.getFullYear()}`}</Text>
    </View>
  );
}

const MorgageCalculator = ({ detail })  => {
  const monthlyFee = (((detail.prices[0].max - (detail.prices[0].max/10)) * 1.045)/(35 * 12)).toFixed(0);
  return (
    <View
      style={[styles.sectionWrapper, {
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
      }]}
    >
      <Icons iconName={'FontAwesome5'} name={'calculator'} style={{
        fontSize: 20,
        color: '#A6A6A6',
        paddingRight: 15,
      }} />
      <View
        style={{
          flex: 1,
        }}
      >
        <Text style={{ fontSize: 12, paddingBottom: 5, }}>{'Mortgage Calculator'}</Text>
        <Text style={{ fontWeight: '500', }}>{`RM ${numberWithCommas(monthlyFee)} per month`}</Text>
      </View>
      <Icons iconName={'SimpleLineIcons'} name={'arrow-right'} style={{ color: '#323232', fontSize: 20, }} />
    </View>
  );
}

const MoreDetail = ({ detail }) => {
  return (
    <View
      style={[styles.sectionWrapper, { marginBottom: 10, }]}
    >
      <Text style={{ fontWeight: '500', }}>{detail.title}</Text>
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
            fontWeight: '500',
            color: '#2B81C6',
          }}
        >{'READ MORE'}</Text>
      </TouchableOpacity>
    </View>
  )
}

const popertyInformation = [{
  title: 'Land Title Type',
  label: 'landTitleType',
},{
  title: 'Tenure',
  label: 'tenure',
},{
  title: 'Furnishing',
  label: 'furnishing',
},{
  title: 'Unit Type',
  label: 'unitType',
},{
  title: 'Occupancy',
  label: 'occupancy',
},{
  title: 'Title Type',
  label: 'titleType',
},]

const PropertyInformation = ({ detail })  => {
  const { attributes } = detail;
  return (
    <View
    style={[styles.sectionWrapper, { marginBottom: 10, }]}
    >
      <Text style={{ fontWeight: '500', }}>{'Property Information'}</Text>
      <View
        style={{
          paddingVertical: 10,
        }}
      >
        {popertyInformation.map((item) => (<View
          key={item.label}
          style={{
            flexDirection:'row',
            paddingVertical: 5,
          }}
        >
          <Text style={{flex:1}}>{item.title}</Text>
          <Text style={{flex:1}}>{attributes[item.label] || '-'}</Text>
        </View>))}
      </View>
      <TouchableOpacity
      >
        <Text
          style={{
            fontWeight: '500',
            color: '#2B81C6',
          }}
        >{'MORE DETAILS'}</Text>
      </TouchableOpacity>
    </View>
  )
}

const Lister = ({ detail })  => {
  const lister = (detail.listers || [])[0];
  const organisation = (detail.organisations || [])[0];

  return !lister ? null : (
    <>
    <View
      style={[styles.sectionWrapper, { paddingVertical: 5, }]}
    >
      <Text
        style={{
          fontWeight: '500',
        }}
      >{organisation.name}</Text>
    </View>
    <View
      style={[styles.sectionWrapper, { flexDirection: 'row', alignItems: 'center', }]}
    >
      {lister.image?.thumbnailUrl && <Image source={{ uri: lister.image.thumbnailUrl }} style={{ width: 50, height: 50, borderRadius: 25, marginRight: 10, }} />}
      <View
        style={{
          flex: 1,
        }}
      >
        <Text style={{fontWeight: '500',}}>{lister.name}</Text>
        <Text>{lister.license || '-'}</Text>
      </View>
      <Icons iconName={'AntDesign'} name={'message1'} style={{ fontSize: 20, paddingHorizontal: 10, }} />
      <Icons iconName={'SimpleLineIcons'} name={'phone'} style={{ fontSize: 20, paddingHorizontal: 10, }} />
    </View>
    </>
  );
}

const Contact = ({ detail }) => {
  return (
    <View
      style={[styles.sectionWrapper, {
        paddingVertical: 5,
        borderTopWidth: .3,
        borderTopColor: '#A6A6A6',
        flexDirection: 'row',
      }]}
    >
      <TouchableWithoutFeedback>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 10,
          backgroundColor: '#2B81C6',
          borderRadius: 5,
          borderWidth: 1,
          borderColor: '#2B81C6',
          marginRight: 5,
        }}
      >
        <Text style={{ color: '#ffffff', fontWeight:'500', }}>{'Contact'}</Text>
      </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 10,
          backgroundColor: '#EFEFEF',
          borderRadius: 5,
          borderWidth: 1,
          borderColor: '#687786',
          marginLeft: 5,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Icons iconName={'FontAwesome5'} name={'whatsapp'} style={{ color:'#25d366', fontSize: 20, paddingRight: 10, }} />
          <Text>{'Whatsapp'}</Text>
        </View>
      </View>
      </TouchableWithoutFeedback>
    </View>
  )
}

const Detail = ({ detail })  => {
  return (
    <>
      <ImageCarousel detail={detail} />
      <Information detail={detail} />
      <MorgageCalculator detail={detail} />
      <MoreDetail detail={detail} />
      <PropertyInformation detail={detail} />
      <Lister detail={detail} />
    </>
  );
}

const PropertyDetailScreen = () => {
  const { listing } = useContext(ListingContext);
  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        <Header detail={listing} />
        <Detail detail={listing} />
      </ScrollView>
      <Contact />
    </>
  );
}

export default PropertyDetailScreen;