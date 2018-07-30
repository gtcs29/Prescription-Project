import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  AsyncStorage
} from 'react-native';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';
import { Tab, Tabs, Accordion, Container, Button, Text, Content, Form, Item, Label, Input, Header, Body, Title, Card, CardItem} from 'native-base';

import Tab1 from './AllPrescriptionsScreen';
import Tab2 from './PrescriptionSortScreen';
import Tab3 from './PrescriptionSearchScreen';

export default class PrescriptionsScreen extends React.Component {
  static navigationOptions = {
    title: 'Prescriptions!',
  };

  render() {
    return (

      <Container>
       <Tabs >
         <Tab heading="All" >
           <Tab1 navigation={this.props.navigation}/>
         </Tab>
         <Tab heading="Sort">
           <Tab2 navigation={this.props.navigation}/>
         </Tab>
         <Tab heading="Search">
           <Tab3 navigation={this.props.navigation}/>
         </Tab>
       </Tabs>
     </Container>

)};
_seePrescription = () => {
  var newVar = {
    docName: "testDoc",
    patientName: "testPatient",
    date: "testDate",
  }
  this.props.navigation.navigate('SinglePrescription', {newVar});
};
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  contentContainer: {
    paddingTop: 30,
  },

});
