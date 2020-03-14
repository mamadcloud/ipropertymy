import { useState, createContext, } from 'react';

const defaultValue = {
  listing: {},
  setListing: () => _,
}

const ListingContext = createContext();
export default ListingContext;

export const initListingContextValue = () => {
  const [ listing, setListing ] = useState(defaultValue);

  return {
    listing,
    setListing,
  }
}