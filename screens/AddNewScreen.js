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
import { ListView } from '@shoutem/ui';
import { MonoText } from '../components/StyledText';
import { Tab, Accordion, Container, Button, Text, Content, Form, Item, Label, Input, Header, Body, Title, Card, CardItem, Picker} from 'native-base';

import GenerateForm from 'react-native-form-builder';


export default class AddNewScreen extends React.Component {
  static navigationOptions = {
    title: 'Prescriptions!',
  };

  constructor(props) {
    super(props);
    this.confirm = this.confirm.bind(this);
    var i = 0;
    var tempFields = [
      {
        type: 'text',
        name: 'docName',
        required: true,
        icon: 'ios-person',
        label: 'Doctor Name',
      },
      {
        type: 'text',
        name: 'patientName',
        icon: 'ios-lock',
        required: true,
        label: 'Patient Name',
      },
      {
        type: 'date',
        name: 'date',
        mode: 'date',
        label: 'Select Date',
        required: true,
        maxDate: new Date(2018, 7, 15),
        minDate: new Date(1990, 7, 15),
      },
    ]
    while(i < this.props.navigation.state.params.newVar.meds) {
      tempFields.push(
        {
          type: 'group',
          name: 'Medicine' + i,
          label: 'Medicine',
          fields: [
            {
              type: 'text',
              name: 'medicine',
              label: 'Add Medicine',
            },
            {
              type: 'text',
              name: 'medicineDosage',
              label: 'Add Dosage',
            },
          ]
        });
      i++;
    }
    var i = 0;

    while(i < this.props.navigation.state.params.newVar.appointments) {
      tempFields.push({
        type: 'date',
        name: 'Appointment'+ i,
        mode: 'date',
        label: 'Appointment',
        maxDate: new Date(2018, 7, 15),
        minDate: new Date(1990, 7, 15),
      });
      i++;
    }
    var i = 0;
    while(i < this.props.navigation.state.params.newVar.diagnosis) {
      tempFields.push({
        type: 'text',
        name: 'Diagnosis'+ i,
        required: true,
        icon: 'ios-person',
        label: 'Diagnosis',
      });
      i++;
    }

    var i = 0;

    while(i < this.props.navigation.state.params.newVar.testres) {
      tempFields.push({
        type: 'text',
        name: 'testres'+ i,
        required: true,
        icon: 'ios-person',
        label: 'Test Results',
      });
      i++;
    }


    this.state = {fields: tempFields}

  }

  confirm() {
    const formValues = this.formGenerator.getValues();
    console.log(formValues);
    formValues["date"] = formValues["date"].toString();
    formValues['date'].split(" ")[0]+formValues['date'].split(" ")[1]+formValues['date'].split(" ")[2]+formValues['date'].split(" ")[3];

    formValues["amounts"] = {
      "medicines": this.props.navigation.state.params.newVar.meds,
      "appointments": this.props.navigation.state.params.newVar.appointments,
      "diagnosis": this.props.navigation.state.params.newVar.diagnosis,
      "testResults": this.props.navigation.state.params.newVar.testres
    }
    var i;
    for(i=0; i < this.props.navigation.state.params.newVar.appointments; i++) {
      formValues['Appointment'+i] = formValues['Appointment'+i].toString();
      formValues['Appointment'+i].split(" ")[0]+formValues['Appointment'+i].split(" ")[1]+formValues['Appointment'+i].split(" ")[2]+formValues['Appointment'+i].split(" ")[3];
    }

    return(formValues);
  }

  render() {

    return (

      <Container style={styles.container} contentContainerStyle={styles.contentContainer}>

        <Content>

          <View>
            <GenerateForm
              ref={(c) => {
                this.formGenerator = c;
              }}
              fields={this.state.fields}
            />
          </View>

          <View style={styles.submitButton}>
            <Button block onPress={() => this.confirm()}>
              <Text>Confirm</Text>
            </Button>
          </View>

        </Content>

      </Container>

    );
  }


  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };

}

const styles = StyleSheet.create({
  ListViewOdd: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: '#000000',
    borderBottomWidth:1,
    backgroundColor: '#ffffff'

  },
  ListViewEven: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: '#000000',
    borderBottomWidth:1,
    backgroundColor: '#eae0ff'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  contentContainer: {
    paddingTop: 30,
  },
    submitButton: {
      paddingHorizontal: 10,
      paddingTop: 20,
    },

});
