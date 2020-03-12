import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/Home';
import SearchScreen from '../screens/Search';
import PropertyDetailScreen from '../screens/PropertyDetail';
import { SCREENS } from './constants';

const Stack = createStackNavigator();

const HomeStackNavigation = () => {
  return (
    <Stack.Navigator
    headerMode={'none'}
    initialRouteName={SCREENS.PROPERTY_DETAIL}
    >
      <Stack.Screen name={SCREENS.HOME} component={HomeScreen} />
      <Stack.Screen name={SCREENS.SEARCH} component={SearchScreen} />
      <Stack.Screen name={SCREENS.PROPERTY_DETAIL} component={PropertyDetailScreen} />
    </Stack.Navigator>
  );
}

export default HomeStackNavigation;