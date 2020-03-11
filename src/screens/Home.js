import React, { useState} from 'react';
import { 
  StatusBar,
  View, 
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  ImageBackground,
  ScrollView,
  Dimensions,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useSafeArea } from 'react-native-safe-area-context';
import { SimpleLineIcons } from '../components/icons';

const { width, height } = Dimensions.get("window");

const styles = {
  font:{
    fontFamily: "Museo Sans",
    fontSize: 15,
    fontWeight: "300"
  },
  activeText: {
    color: "#2B81C6",
  },
  inactiveText: {
    color: "#687786",
  }
}

const CHANNELS = {
  SALE: "sale",
  RENT: "rent"
}

const NEWS = [
  {
    title: "BNM cuts OPR by 25 bp to 2.50% – the lowest in almost 10 years",
    image: "https://lifestyle.prod.content.iproperty.com/news/wp-content/uploads/sites/3/2019/02/14191551/bank-negara-malaysia-bnm-500x333.jpg",
  },
  {
    title: "Tropicana’s Q4 2019 net profit surges 354.4% to RM233.9 million",
    image: "https://lifestyle.prod.content.iproperty.com/news/wp-content/uploads/sites/3/2020/03/03141911/1.-TwinPines-Serviced-Suites-Tropicana-Grandhill-500x422.jpg",
  },
  {
    title: "UEM Sunrise targets to launch properties with a GDV of RM2.0 billion focusing on mid-market landed segment",
    image: "https://lifestyle.prod.content.iproperty.com/news/wp-content/uploads/sites/3/2020/03/03115159/UEMS-Media-Briefing-Photo-1-500x333.jpg",
  },
  {
    title: "MIEA launched its first-ever public awareness campaign and #MYREALAGENTS website",
    image: "https://lifestyle.prod.content.iproperty.com/news/wp-content/uploads/sites/3/2020/03/02105417/MIEA-1-500x333.jpg",
  },
  {
    title: "Marriott International signs agreement with SKS Group to bring The Four Points By Sheraton brand to Desaru, Malaysia",
    image: "https://lifestyle.prod.content.iproperty.com/news/wp-content/uploads/sites/3/2020/03/02102922/Four-Points-by-Sheraton-Desaru-Exterior-Rendering-500x281.jpg",
  },
  {
    title: "Government’s RM20 billion Economic Stimulus Package: Here’s what Mah Sing has to say",
    image: "https://lifestyle.prod.content.iproperty.com/news/wp-content/uploads/sites/3/2020/02/28154735/Tan-Sri-Dato-Sri-Leong-Hoy-Kum1-500x333.jpg",
  }
]

const LIFESTYLES = [
  {
    title: "Best 7 plant nurseries in KL for all your indoor plant needs",
    image: "https://lifestyle.prod.content.iproperty.com/news/wp-content/uploads/sites/3/2020/03/09104604/45684288_m-768x513.jpg",
  },
  {
    title: "12 most effective mosquito repellent plants for your home",
    image: "https://lifestyle.prod.content.iproperty.com/news/wp-content/uploads/sites/3/2020/02/12161741/tanaman-ini-boleh-halau-nyamuk-di-rumah-500x263.jpg",
  },
  {
    title: "4 bedroom feng shui tips for a good night’s sleep",
    image: "https://lifestyle.prod.content.iproperty.com/news/wp-content/uploads/sites/3/2019/06/15104701/88996296_m-500x333.jpg",
  },
  {
    title: "The 7 best smart home devices and systems of 2020",
    image: "https://lifestyle.prod.content.iproperty.com/news/wp-content/uploads/sites/3/2020/02/27103414/101852838_m-500x334.jpg",
  },
  {
    title: "9 dreamy bedroom decorating ideas",
    image: "https://lifestyle.prod.content.iproperty.com/news/wp-content/uploads/sites/3/2020/03/05173710/bed-designs-images-bedroom-ideas-500x375.jpg",
  },
  {
    title: "6 kesilapan yang perlu dielakkan ketika memilih lampu untuk rumah anda",
    image: "https://lifestyle.prod.content.iproperty.com/news/wp-content/uploads/sites/3/2020/01/29093507/24913556_m-500x392.jpg",
  }
]

const SearchBox = () => {
  const insets = useSafeArea();
  const [channel, setChannel] = useState(CHANNELS.SALE);

  return (
    <View
      style={{
        backgroundColor: "#2B81C6",
        paddingTop: insets.top,
      }}
    >
    <Image source={require("../../assets/images/logo.png")} style={{
      paddingTop: 10,
      width: 180,
      resizeMode: "contain",
      alignSelf: "center",
    }} />
      <View
        style={{
          marginHorizontal: 8,
          backgroundColor: "#ffffff",
          borderRadius: 5,
          marginVertical: 10,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            borderBottomWidth: .3,
            borderBottomColor: "#A6A6A6",
          }}
        >
          <TouchableWithoutFeedback
           onPress={() => channel !== CHANNELS.SALE && setChannel(CHANNELS.SALE)}
          >
            <View
              style={{
                flex: 1,
                alignItems: "center",
                paddingVertical: 10,
                borderBottomWidth: 1,
                borderBottomColor: channel !== CHANNELS.SALE ? "#FFFFFF" : "#2B81C6",
              }}
            >
              <Text
                style={[styles.font, channel === CHANNELS.SALE ? styles.activeText : styles.inactiveText]}
              >{'BUY'}</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
           onPress={() => channel !== CHANNELS.RENT && setChannel(CHANNELS.RENT)}
           >
            <View
              style={{
                flex: 1,
                alignItems: "center",
                paddingVertical: 10,
                borderBottomWidth: 1,
                borderBottomColor: channel !== CHANNELS.RENT ? "#FFFFFF" : "#2B81C6",
              }}
            >
              <Text
                style={[styles.font, channel === CHANNELS.RENT ? styles.activeText : styles.inactiveText]}
              >{'RENT'}</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
          <TouchableOpacity
            style={{
              paddingVertical: 15,
              paddingHorizontal: 10,
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <SimpleLineIcons name="magnifier" style={[styles.font, styles.inactiveText, { fontSize: 15, paddingHorizontal: 10, }]} />
            <Text
              style={[styles.font, styles.inactiveText, { paddingLeft: 5, }]}
            >{'Search for properties'}</Text>
          </TouchableOpacity>
      </View>
    </View>
  );
}

const Articles = (props) => {
  const { section, articles } = props;
  const firstBox = ({ item, index }) => (
    <View 
      key={`${section}-${index}`}
      style={{
        marginHorizontal: 10,
        marginBottom: 10,
        borderWidth: .3,
        borderColor: "#A6A6A6",
        borderRadius: 5,
        backgroundColor: "#ffffff",
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
      <View
        style={{
          padding: 15,
        }}
      >
        <Text
          style={[
            styles.font,
            { fontWeight: "500", }
          ]}
        >{item.title}</Text>
      </View>
    </View>
  );

  const widthCarousel = width * (.60);
  const heightCarousel = widthCarousel * .4;
  const carousel = ({ item, index }) => (
    <View 
      key={`${section}-${index}`}
      style={{
        marginHorizontal: 10,
        borderWidth: .3,
        borderColor: "#A6A6A6",
        borderRadius: 5,
        backgroundColor: "#ffffff",
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
          justifyContent: "center",
          padding: 15,
        }}
      >
        <Text
          numberOfLines={3} 
          ellipsizeMode ={'tail'}
          style={[
            styles.font,
            { 
              fontWeight: "500", 
            }
          ]}
        >{item.title}</Text>
      </View>
    </View>
  );

  const firstArticle = articles.shift();

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
          flexDirection: "row",
          flex: 1,
          justifyContent:"space-between"
        }}
      >
        <Text
          style={[styles.font, { fontWeight: "500", }]}
        >{section}</Text>
        <TouchableWithoutFeedback>
          <Text
            style={[styles.font, styles.activeText, { fontWeight: "500", }]}
          >{'MORE'}</Text>
        </TouchableWithoutFeedback>
      </View>
      {firstBox({ item: firstArticle, index: 0 })}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
      >
      {articles.map((item, index) => {
        return carousel({ item, index });
      })}
      </ScrollView>
    </View>
  );

}

const HomeScreen = () => {
  useFocusEffect(() => {
    StatusBar.setBarStyle("light-content")
  });
  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        <SearchBox />
        <Articles section={"News"} articles={NEWS} />
        <Articles section={"Lifestyles"} articles={LIFESTYLES} />
      </ScrollView>
    </>
  )
}

export default HomeScreen;