import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import RemindersScreen from '../screens/RemindersScreen';
import SettingsScreen from '../screens/SettingsScreen';
import PrescriptionsScreen from '../screens/PrescriptionsScreen';
import SinglePrescriptionScreen from '../screens/SinglePrescriptionScreen';
import PrescriptionSortScreen from '../screens/PrescriptionSortScreen';
import AddNewScreen from '../screens/AddNewScreen';






const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

const RemindersStack = createStackNavigator({
  Reminders: RemindersScreen,
});

RemindersStack.navigationOptions = {
  tabBarLabel: 'Reminders',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-link${focused ? '' : '-outline'}` : 'md-link'}
    />
  ),
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-options${focused ? '' : '-outline'}` : 'md-options'}
    />
  ),
};

const PrescriptionsStack = createStackNavigator({
  Prescriptions: PrescriptionsScreen,
  SinglePrescription: SinglePrescriptionScreen,
  AddNew: AddNewScreen,
});

PrescriptionsStack.navigationOptions = {
  tabBarLabel: 'Prescriptions',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-options${focused ? '' : '-outline'}` : 'md-options'}
    />
  ),
};



export default createBottomTabNavigator({
  HomeStack,
  PrescriptionsStack,
  RemindersStack,
  SettingsStack,
});
