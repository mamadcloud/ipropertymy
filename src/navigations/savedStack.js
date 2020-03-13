import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { SCREENS } from './constants';

import SavedScreen from 'screens/Saved';
import PropertyDetailScreen from 'screens/PropertyDetail';

const Stack = createStackNavigator();

const SavedStackNavigation = () => {
  return (
    <Stack.Navigator
    headerMode={'none'}
    >
      <Stack.Screen name={SCREENS.SAVED} component={SavedScreen} />
      <Stack.Screen name={SCREENS.PROPERTY_DETAIL} component={PropertyDetailScreen} />
    </Stack.Navigator>
  );
}

export default SavedStackNavigation;