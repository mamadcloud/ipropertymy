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
import { SCREENS } from 'navigations/constants';

import Text from 'components/Text';
import Icons from 'components/Icons';
import { numberWithCommas } from 'libs/numberUtils';
import searches from 'sample-data/search-results-page';

const { width, height } = Dimensions.get('window');
const thumhnailHeight = width * .55;

const styles = {
  activeText: {
    color: '#2B81C6',
  },
  inactiveText: {
    color: '#687786',
  }
}

const convertSizeUnit = (sizeUnit) => {
  switch(sizeUnit) {
    case 'SQUARE_FEET':
      return 'sq. ft.';
    default:
      return sizeUnit;
  }
}

const SearchBox = ({ navigation }) => {
  const insets = useSafeArea();

  return (
    <View
      style={{
        backgroundColor: '#ffffff',
        paddingTop: insets.top,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#EBEBEB',
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
        <Icons iconName={'SimpleLineIcons'} name={'arrow-left'} style={{ color: '#323232', fontSize: 20, }} />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          paddingVertical: 10,
          paddingHorizontal: 5,
          alignItems: 'center',
          flexDirection: 'row',
          borderWidth: 1,
          borderColor: '#EFEFEF',
          margin: 10,
          borderRadius: 5,
          flex: 1,
        }}
      >
        <Icons iconName={'SimpleLineIcons'} name='magnifier' style={[styles.inactiveText, { fontSize: 15, paddingHorizontal: 10, }]} />
        <Text
          style={[{ color: '#323232', paddingLeft: 5, fontWeight: '500', }]}
        >{'Selangor'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const Filter = () => {
  return (
    <View
      style={{
        backgroundColor: '#FCFCFC',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#E3E3E4',
        borderBottomWidth: 1,
      }}
    > 
      <TouchableOpacity
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: 10,
          flexDirection: 'row',
        }}
      >
        <Icons iconName={'Ionicons'} name={'md-switch'} style={{ color: '#323232', fontSize: 15, paddingRight: 10, }} />
        <Text>{'FILTER'}</Text>
      </TouchableOpacity>
      <View style={{
        borderLeftWidth: 1,
        height: 15,
      }} />
      <TouchableOpacity
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: 10,
          flexDirection: 'row',
        }}
      >
        <Icons iconName={'AntDesign'} name={'menuunfold'} style={{ color: '#323232', fontSize: 13, paddingRight: 10, }} />
        <Text>{'SORT'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const DEFAULT_IMAGE = 'https://via.placeholder.com/500x300';
const ResultCard = ({ item, navigation, }) => {
  const defaultUrl = item.cover?.url || DEFAULT_IMAGE;
  const [ url, setUrl ] = useState(defaultUrl);
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
          <Image 
            source={{ uri: url, }} 
            style={{ height: thumhnailHeight, }} 
            onError={() => setUrl(DEFAULT_IMAGE)}
          />
          <View
            style={{
              backgroundColor: '#ffffff',
              padding: 15,
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: '500', }}>{`RM ${numberWithCommas(item.prices[0].max)}`}</Text>
            <Text numberOfLines={1} style={{ paddingTop: 10, fontSize: 18, fontWeight: '500', }}>{item.title}</Text>
            {item.address?.formattedAddress && <Text numberOfLines={1}>{item.address?.formattedAddress}</Text>}
            <Text style={{ paddingTop: 10, }}>{item.propertyType}</Text>
            {item.attributes.builtUp && <Text style={{ }}>{`Built-up Size: ${item.attributes.builtUp} ${convertSizeUnit(item.attributes.sizeUnit)}`}</Text>}
            {item.attributes.landArea && <Text style={{ }}>{`Land Area: ${item.attributes.landArea} ${convertSizeUnit(item.attributes.sizeUnit)}`}</Text>}
            {item.attributes.furnishing && <Text style={{ }}>{`Furnishing: ${item.attributes.furnishing}`}</Text>}
            <View
              style={{
                flexDirection: 'row',
                flex: 1,
                alignItems: 'flex-end',
                paddingTop: 10,
              }}
            >
            <View
              style={{
                flexDirection: 'row',
                flex: 1,
                alignItems: 'flex-end',
              }}
            >
              {
                  [{ label: 'bedroom', icon: 'bed', }, { label: 'bathroom', icon: 'bath', }, { label: 'carPark', icon: 'car', }].map(i => (
                    item.attributes[i.label] && <View style={{
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
                          style={{ fontSize: 15, color: '#A5A5A5',   }} 
                        />
                      </View>
                      <Text>{item.attributes[i.label]}</Text>
                    </View>
                  ))
                }
              </View>
              <Icons iconName={'MaterialCommunityIcons'} name='star-outline' style={{ fontSize: 25, color: '#F6B042', }} />
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
      renderItem={({ item }) => <ResultCard item={item} navigation={navigation} /> }
      data={searches.items}
    />
  );
}

const SearchSearch = () => {
  return (
    <>
      <StatusBar barStyle={'dark-content'} />
      <Result />
    </>
  );
}

export default SearchSearch;