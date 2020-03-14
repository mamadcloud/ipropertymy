import React, { useEffect, } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ListingsContext, { initListingsContextValue, } from 'contexts/ListingsContext';
import ListingContext, { initListingContextValue, } from 'contexts/ListingContext';

import HomeScreen from 'screens/Home';
import SearchScreen from 'screens/Search';
import PropertyDetailScreen from 'screens/PropertyDetail';

import { SCREENS } from 'navigations/constants';

const Stack = createStackNavigator();

const HomeStackNavigation = () => {
  const listingsContextValue = initListingsContextValue();
  const listingContextValue = initListingContextValue();

  return (
    <ListingsContext.Provider value={listingsContextValue}>
      <ListingContext.Provider value={listingContextValue}>
          <Stack.Navigator
            headerMode={'none'}
          >
            <Stack.Screen name={SCREENS.HOME} component={HomeScreen} />
            <Stack.Screen name={SCREENS.SEARCH} component={SearchScreen} />
            <Stack.Screen name={SCREENS.PROPERTY_DETAIL} component={PropertyDetailScreen} />
          </Stack.Navigator>
      </ListingContext.Provider>
    </ListingsContext.Provider>
  );
}

export default HomeStackNavigation;