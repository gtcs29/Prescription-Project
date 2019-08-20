import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { createStackNavigator, createSwitchNavigator, createAppContainer } from 'react-navigation';

import { Container, Button, Text, Content, Form, Item, Label, Input, Header, Body, Title} from 'native-base';

import MainTabNavigator from './MainTabNavigator';

import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import emailVerificationScreen from '../screens/emailVerificationScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import PasswordResetScreen from '../screens/PasswordResetScreen';


const AuthStack = createStackNavigator({ SignIn: SignInScreen, SignUp: SignUpScreen,
  emailVerification: emailVerificationScreen, ForgotPassword: ForgotPasswordScreen  });

const PasswordResetStack = createStackNavigator({PasswordReset: PasswordResetScreen})

export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    PasswordReset: PasswordResetStack,
    // App: AppStack,
    Main: MainTabNavigator,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
));
