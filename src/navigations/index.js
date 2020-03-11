import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, } from 'react-native';

import HomeScreen from '../screens/Home';
import SavedScreen from '../screens/Saved';
import {
  MaterialCommunityIcons,
  EvilIcons,
} from '../components/icons';


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
        activeTintColor: "#2B81C6",
        inactiveTintColor: "#A6A6A6",
        style: {
          backgroundColor: "#ffffff",
          paddingTop: 5,
        }
      }}
    >
      <Tabs.Screen 
        name={"Home"} 
        component={HomeScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen 
        name={"Saved"} 
        component={SavedScreen} 
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons name={ focused ? "star" : "star-outline" } color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen 
        name={"Me"} 
        component={MeScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <EvilIcons name="user" color={color} size={30} />
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