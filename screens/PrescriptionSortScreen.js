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


import { Tab, Accordion, Container, Button, Text, Content, Form, Item, Label, Input, Header, Body, Title, Card, CardItem} from 'native-base';


export default class PrescriptionSortScreen extends React.Component {

  constructor(props)
  {
      super(props);
  }

  render() {
    return (

      <Container style={styles.container} contentContainerStyle={styles.contentContainer}>
        <Header>
          <Text>All Prescriptions</Text>
        </Header>
        <Content>
          <Button block onPress={this._seePrescription}>
            <Text> Press</Text>
          </Button>
        </Content>

      </Container>

    );
  }

  _seePrescription = () => {
    var newVar = {
      docName: "testDoc",
      patientName: "testPatient",
      date: "testDate",
    }
    this.props.navigation.navigate('SinglePrescription', {newVar});
  };

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
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
