import { createContext, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

const defaultValue = {
  items: [],
  setShortlist: () => _,
  load: () => _,
}

const ShortlistContext = createContext(defaultValue);
export default ShortlistContext;

export const initShortlistContextValue = () => {
  const [ shortlist, setShortlist ] = useState(defaultValue);

  shortlist.setShortlist = (item) => {
    const { items } = shortlist;
    const index = items.map(i => i.id).indexOf(item.id);
    if (index > -1) items.splice(index,1); 
    else items.push(item);
    setShortlist(Object.assign({}, shortlist, { items, }));
    AsyncStorage.setItem('shortlist', JSON.stringify({ items }));
  }

  shortlist.load = (data) =>{
    setShortlist(Object.assign({}, shortlist, data));
  }

  return {
    ...shortlist,
  }
}