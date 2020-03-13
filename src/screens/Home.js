import React, { useState} from 'react';
import { 
  StatusBar,
  View, 
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  ImageBackground,
  ScrollView,
  Dimensions,
} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useSafeArea } from 'react-native-safe-area-context';
import { SCREENS } from 'navigations/constants';
import Icons from 'components/Icons';
import Text from 'components/Text';

import articles from 'sample-data/articles.json';

const { width, height } = Dimensions.get('window');

const styles = {
  activeText: {
    color: '#2B81C6',
  },
  inactiveText: {
    color: '#687786',
  }
}

const CHANNELS = {
  SALE: 'sale',
  RENT: 'rent'
}

const SearchBox = () => {
  const insets = useSafeArea();
  const [channel, setChannel] = useState(CHANNELS.SALE);
  const navigation = useNavigation();

  return (
    <View
      style={{
        backgroundColor: '#2B81C6',
        paddingTop: insets.top,
      }}
    >
      <Image source={require('assets/images/logo.png')} style={{
        paddingTop: 10,
        width: 180,
        resizeMode: 'contain',
        alignSelf: 'center',
      }} />
      <View
        style={{
          marginHorizontal: 8,
          backgroundColor: '#ffffff',
          borderRadius: 5,
          marginVertical: 10,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            borderBottomWidth: .3,
            borderBottomColor: '#A6A6A6',
          }}
        >
          <TouchableWithoutFeedback
           onPress={() => channel !== CHANNELS.SALE && setChannel(CHANNELS.SALE)}
          >
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                paddingVertical: 10,
                borderBottomWidth: 1,
                borderBottomColor: channel !== CHANNELS.SALE ? '#FFFFFF' : '#2B81C6',
              }}
            >
              <Text
                style={[channel === CHANNELS.SALE ? styles.activeText : styles.inactiveText]}
              >{'BUY'}</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
           onPress={() => channel !== CHANNELS.RENT && setChannel(CHANNELS.RENT)}
           >
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                paddingVertical: 10,
                borderBottomWidth: 1,
                borderBottomColor: channel !== CHANNELS.RENT ? '#FFFFFF' : '#2B81C6',
              }}
            >
              <Text
                style={[channel === CHANNELS.RENT ? styles.activeText : styles.inactiveText]}
              >{'RENT'}</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <TouchableOpacity
          style={{
            paddingVertical: 15,
            paddingHorizontal: 10,
            alignItems: 'center',
            flexDirection: 'row',
          }}
          onPress={() => navigation.push(SCREENS.SEARCH)}
        >
          <Icons iconName={'SimpleLineIcons'} name='magnifier' style={[styles.inactiveText, { fontSize: 15, paddingHorizontal: 10, }]} />
          <Text
            style={[styles.inactiveText, { paddingLeft: 5, }]}
          >{'Search for properties'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const firstBox = ({ section, item }) => (
  <View 
    key={`${section}-${0}`}
    style={{
      marginHorizontal: 10,
      marginBottom: 10,
      borderWidth: .3,
      borderColor: '#A6A6A6',
      borderRadius: 5,
      backgroundColor: '#ffffff',
    }}
  >
    <ImageBackground 
      source={{ uri: item.image}} 
      style={{
        height: width * .4,
        flex: 1,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        overflow: 'hidden',
      }}
    />
    <Text
      style={[
        { 
          fontWeight: '500',
          padding: 15, 
        }
      ]}
    >{item.title}</Text>
  </View>
);

const carousel = ({ section, item, index, widthCarousel, heightCarousel, }) => (
  <View 
    key={`${section}-${index}`}
    style={{
      marginHorizontal: 10,
      borderWidth: .3,
      borderColor: '#A6A6A6',
      borderRadius: 5,
      backgroundColor: '#ffffff',
      width: widthCarousel,
    }}
  >
    <ImageBackground 
      source={{ uri: item.image }} 
      style={{
        height: heightCarousel,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        overflow: 'hidden',
      }}
    />
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        padding: 15,
      }}
    >
      <Text
        numberOfLines={3} 
        ellipsizeMode ={'tail'}
        style={[
          { 
            fontWeight: '500', 
          }
        ]}
      >{item.title}</Text>
    </View>
  </View>
);

const Articles = (props) => {
  const { section, items } = props;

  const widthCarousel = width * (.60);
  const heightCarousel = widthCarousel * .4;
  const firstArticle = items.shift();

  return (
    <View 
      style={{
        paddingVertical: 10,
      }}
    >
      <View
        style={{
          paddingHorizontal: 10,
          paddingBottom: 10,
          flexDirection: 'row',
          flex: 1,
          justifyContent:'space-between'
        }}
      >
        <Text
          style={[{ fontWeight: '500', }]}
        >{section}</Text>
        <TouchableWithoutFeedback>
          <Text
            style={[styles.activeText, { fontWeight: '500', }]}
          >{'MORE'}</Text>
        </TouchableWithoutFeedback>
      </View>
      {firstBox({ section, item: firstArticle, })}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
      >
      {items.map((item, index) => {
        return carousel({ section, item, index, widthCarousel, heightCarousel, });
      })}
      </ScrollView>
    </View>
  );

}

const HomeScreen = () => {
  useFocusEffect(() => {
    StatusBar.setBarStyle('light-content')
  });
  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        <SearchBox />
        <Articles section={'News'} items={articles.news} />
        <Articles section={'Lifestyles'} items={articles.lifestyles} />
      </ScrollView>
    </>
  )
}

export default HomeScreen;