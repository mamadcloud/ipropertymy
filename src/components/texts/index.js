import React from 'react';
import {
  Text as RNText
} from 'react-native';

import * as styles from './styles';

const Text = (props) => {
  const { 
    numberOfLines,
    ellipsizeMode,
    style,
  } = props;

  return (
    <RNText 
      style={[styles.font, style]}
      numberOfLines={numberOfLines}
      ellipsizeMode={ellipsizeMode}
    >
      {props.children}
    </RNText>
  )
}

export default Text;