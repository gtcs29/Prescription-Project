import React from 'react';
import {Button, Text} from "native-base";
import {View} from "react-native";

const BTYPES = {
  'dark': '#4b8477',
  'light': '#9abdb5'
};

export const AuthButton = ({ text, onClick, type }) => (
  <Button style={[{backgroundColor: BTYPES[type.toLowerCase()]}, {marginHorizontal: 20, marginVertical: 10}]} block onPress={onClick} >
    <Text>{text} </Text>
  </Button>
);

export const AuthButtonTrans = ({ text, onPress }) => (
  <View style={{paddingBottom: 10}}>
    <Button transparent full onPress={onPress} >
      <Text style={{color: '#4b8477'}}>{text}</Text>
    </Button>
  </View>
);

