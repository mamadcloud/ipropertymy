import React from 'react';
import { 
  TouchableOpacity
} from 'react-native';
import Icons from 'components/Icons';

export const BackButton = ({ style, navigation }) => {
  
  return (<TouchableOpacity
    style={style}
    onPress={() => navigation.goBack()}
  >
    <Icons iconName={'SimpleLineIcons'} name={'arrow-left'} style={{ color: '#323232', fontSize: 20, }} />
  </TouchableOpacity>)
}
