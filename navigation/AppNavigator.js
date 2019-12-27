import React from 'react';
import { createStackNavigator, createSwitchNavigator, createAppContainer } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import SignInScreen from '../screens/Auth/SignInScreen';
import SignUpScreen from '../screens/Auth/SignUpScreen';
import emailVerificationScreen from '../screens/Auth/emailVerificationScreen';
import ForgotPasswordScreen from '../screens/Auth/ForgotPasswordScreen';
import PasswordResetScreen from '../screens/Auth/PasswordResetScreen';


const AuthStack = createStackNavigator({ SignIn: SignInScreen, SignUp: SignUpScreen,
  emailVerification: emailVerificationScreen, ForgotPassword: ForgotPasswordScreen  });

const PasswordResetStack = createStackNavigator({PasswordReset: PasswordResetScreen});

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
