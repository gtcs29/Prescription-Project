import React from 'react';
import {Image} from 'react-native';

export const Logo = ({ width, height }) => (
  <Image style={{width: width, height: height}} source={require('../assets/images/logoTeal.png')} />
);

