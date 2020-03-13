import React from 'react';
import {
  Text as RNText,
  StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  default:{
    fontFamily: 'Museo Sans',
    fontSize: 15,
    fontWeight: '300'
  }
})

const Text = (props) => {
  const { 
    numberOfLines,
    ellipsizeMode,
    style,
  } = props;

  return (
    <RNText 
      style={[styles.default, style]}
      numberOfLines={numberOfLines}
      ellipsizeMode={ellipsizeMode}
    >
      {props.children}
    </RNText>
  )
}

export default Text;