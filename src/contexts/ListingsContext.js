import { useState, createContext, } from 'react';

const defaultValue = {
  items: [],
}

const ListingsContext = createContext();
export default ListingsContext;

export const initListingsContextValue = () => {
  const [ listings, setListings ] = useState(defaultValue);
  return {
    listings,
    setListings,
  }
}