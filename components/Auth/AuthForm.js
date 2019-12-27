import React from 'react';
import {Form, Input, Item, Label} from "native-base";

export const AuthForm = (props) => (
  <Form style={{paddingTop:0, paddingHorizontal: 10, paddingVertical:20}}>
    {props.children}
  </Form>
);

export const AuthItem =({ label, onChangeText, secureTextEntry, defaultValue }) => (
  <Item stackedLabel>
    <Label>{label}</Label>
    <Input defaultValue={defaultValue || ''} autoCapitalize={'none'} autoCorrect={false} onChangeText={onChangeText} secureTextEntry={secureTextEntry || false}/>
  </Item>
);