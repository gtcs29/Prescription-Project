import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  AsyncStorage,
  ImageBackground,
  Dimensions,
  ActivityIndicator
} from 'react-native';
import { WebBrowser } from 'expo';
import { ListView } from '@shoutem/ui';
import { MonoText } from '../components/StyledText';
import { Tabs, Tab, Accordion, Container, Button, Text, Content, Form, Item, Label, Input, Header, Body, Title, Card, CardItem} from 'native-base';
import firebase from 'firebase';
const window = Dimensions.get('window');


import Tab1 from './TabRemindersScreen';
import Tab2 from './CalendarScreen';

firebaseData = [
  {
    docName: "Test doc",
    patientName: ""
  }
]

export default class RemindersScreen extends React.Component {
  static navigationOptions = {
    title: 'Links',
  };

  render() {
    return (
      <Container>
       <Tabs >
         <Tab heading="Reminders" >
           <Tab1 navigation={this.props.navigation}/>
         </Tab>
         <Tab heading="Calendar">
           <Tab2 navigation={this.props.navigation}/>
         </Tab>
       </Tabs>
     </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
