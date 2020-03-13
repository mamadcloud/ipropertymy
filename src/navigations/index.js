import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { View, } from 'react-native';
import Text from 'components/Text';
import { SCREENS } from 'navigations/constants';

import HomeStackNavigation from 'navigations/homeStack';
import SavedStackNavigation from 'navigations/savedStack';
import Icons from 'components/Icons';


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
          tabBarIcon: ({ color, size }) => (
            <Icons iconName={'MaterialCommunityIcons'} name='home' style={{ fontSize: size, color: color }} />
          ),
        }}
      />
      <Tabs.Screen 
        name={SCREENS.SAVED_STACK} 
        component={SavedStackNavigation} 
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Icons iconName={'MaterialCommunityIcons'} name={ focused ? 'star' : 'star-outline' }  style={{ fontSize: size, color: color }} />
          ),
        }}
      />
      <Tabs.Screen 
        name={SCREENS.ME} 
        component={MeScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icons iconName={'EvilIcons'} name='user'  style={{ fontSize: 30, color: color }} />
          ),
        }}
      />
    </Tabs.Navigator>
  );
}

const MainNavigators = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <HomeScreenNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default MainNavigators;