import React from 'react';
import {Dimensions, KeyboardAvoidingView, View} from 'react-native';
import { Content} from 'native-base';
import {Logo} from "../Logo";
const window = Dimensions.get('window');

export const AuthContainer = (props) => (
  <KeyboardAvoidingView style={{height: 60,flex: 1}} behavior="padding" enabled>
    <Content style={{paddingTop: 50}}>
      {props.children}
    </Content>
    <View style={{ height: 10 }} />
  </KeyboardAvoidingView>
);

export const AuthContainerLogo = (props) => (
  <AuthContainer>
    <Logo width={window.width} height={150}/>
    {props.children}
  </AuthContainer>
);
