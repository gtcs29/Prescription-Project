import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { createStackNavigator, createSwitchNavigator } from 'react-navigation';

import { Container, Button, Text, Content, Form, Item, Label, Input, Header, Body, Title} from 'native-base';

import MainTabNavigator from './MainTabNavigator';

import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import emailVerificationScreen from '../screens/emailVerificationScreen';


const AuthStack = createStackNavigator({ SignIn: SignInScreen, SignUp: SignUpScreen, emailVerification: emailVerificationScreen });

export default createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    // App: AppStack,
    Main: MainTabNavigator,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
);
