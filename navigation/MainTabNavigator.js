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
import PasswordResetProfileScreen from '../screens/PasswordResetProfileScreen';
import MedicineFormScreen from '../screens/MedicineFormScreen';
import AppointmentFormScreen from '../screens/AppointmentFormScreen';
import DiagnosisFormScreen from '../screens/DiagnosisFormScreen';
import TestResultFormScreen from '../screens/TestResultFormScreen';
import TestResultCamera from '../screens/TestResultCamera.js';
import ProfileScreen from '../screens/ProfileScreen';
import MedicalHistoryScreen from '../screens/MedicalHistoryScreen';
import LoginDetailsScreen from '../screens/LoginDetailsScreen';

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
  Prescriptions: PrescriptionsScreen
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
  PasswordResetProfile: PasswordResetProfileScreen,
  Profile: ProfileScreen,
  MedicalHistory: MedicalHistoryScreen,
  LoginDetails: LoginDetailsScreen

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
  MedicineForm: MedicineFormScreen,
  AppointmentForm: AppointmentFormScreen,
  TestResultForm: TestResultFormScreen,
  DiagnosisForm: DiagnosisFormScreen,
  TestResultCamera: TestResultCamera
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
