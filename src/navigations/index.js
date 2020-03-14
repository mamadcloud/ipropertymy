import React, { useEffect, } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { View, } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import Icons from 'components/Icons';
import Text from 'components/Text';
import ShortlistContext, { initShortlistContextValue } from 'contexts/ShortlistContext';
import { SCREENS } from 'navigations/constants';
import HomeStackNavigation from 'navigations/HomeStack';
import SavedStackNavigation from 'navigations/SavedStack';


const Tabs = createBottomTabNavigator();

const MeScreen = () => (
  <SafeAreaView>
    <View>
      <Text>{'Me Screen'}</Text>
    </View>
  </SafeAreaView>
);


const HomeScreenNavigator = () => {
  return (
    <Tabs.Navigator
      tabBarOptions={{
        activeTintColor: '#2B81C6',
        inactiveTintColor: '#A6A6A6',
        style: {
          backgroundColor: '#ffffff',
          paddingTop: 5,
        }
      }}
    >
      <Tabs.Screen 
        name={SCREENS.HOME_STACK} 
        component={HomeStackNavigation} 
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Icons iconName={'MaterialCommunityIcons'} name='home' style={{ fontSize: size, color: color }} />
          ),
        }}
      />
      <Tabs.Screen 
        name={SCREENS.SAVED_STACK} 
        component={SavedStackNavigation} 
        options={{
          title: 'Saved',
          tabBarIcon: ({ focused, color, size }) => (
            <Icons iconName={'MaterialCommunityIcons'} name={ focused ? 'star' : 'star-outline' }  style={{ fontSize: size, color: color }} />
          ),
        }}
      />
      <Tabs.Screen 
        name={SCREENS.ME} 
        component={MeScreen} 
        options={{
          title: 'Me',
          tabBarIcon: ({ color, size }) => (
            <Icons iconName={'EvilIcons'} name='user'  style={{ fontSize: 30, color: color }} />
          ),
        }}
      />
    </Tabs.Navigator>
  );
}

const MainNavigators = () => {
  // AsyncStorage.removeItem('shortlist')
  const shortlistContextValue = initShortlistContextValue();

  useEffect(() => {
    AsyncStorage.getItem('shortlist')
    .then(data => {
      if (data && data !== JSON.stringify(shortlistContextValue.shortlist)) {
        shortlistContextValue.load(JSON.parse(data));
      }
    });

  }, []);

  return (
    <ShortlistContext.Provider value={shortlistContextValue}>
    <SafeAreaProvider>
      <NavigationContainer>
        <HomeScreenNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
    </ShortlistContext.Provider>
  );
}

export default MainNavigators;