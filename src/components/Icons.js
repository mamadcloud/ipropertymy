import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';

SimpleLineIcons.loadFont();
MaterialCommunityIcons.loadFont();
EvilIcons.loadFont();

const Icons = (props) => {
  const { name, iconName, style } = props;
  let Icon = null;
  switch (iconName) {
    case 'MaterialCommunityIcons':
      Icon = MaterialCommunityIcons;
      break;
    case 'EvilIcons':
      Icon = EvilIcons;
      break;
    case 'SimpleLineIcons':
      Icon = SimpleLineIcons;
      break;
    case 'FontAwesome5':
      Icon = FontAwesome5;
      break;
    case 'AntDesign':
      Icon = AntDesign;
      break;
    case 'Ionicons':
      Icon = Ionicons;
      break;
  }
  return <Icon name={name} style={style} />
}

export default Icons;