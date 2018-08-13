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
import { List, ListItem, Icon, Tab, Accordion, Container, Button, Text, Content, Form, Item, Label, Input, Header, Body, Title, Card, CardItem, Picker, Separator} from 'native-base';
import firebase from 'firebase';
import Ionicons from "react-native-vector-icons/Ionicons";

import GenerateForm from 'react-native-form-builder';

const tempFields = [
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
    required: true,
    label: 'Select Date',
    maxDate: new Date(2300, 7, 15),
    minDate: new Date(1880, 7, 15),
  },
]

var medicinesList = [];
var AppointmentList = [];
var DiagnosisList = [];
var TestResultList = [];
var PictureList = [];
var data= {};

export default class AddNewScreen extends React.Component {
  static navigationOptions = {
    title: 'Prescriptions!',
  };

  constructor(props) {
    super(props);
    this.confirm = this.confirm.bind(this);
    this.state = {fields: tempFields, selected1: 'ADD', }
  }

  removeFromList = (name) => {
    if(!medicinesList[name] === undefined ){
      delete medicinesList[name]
    }
    else if(!AppointmentList[name] === undefined ){
      delete AppointmentList[name]
    }
    else if(!DiagnosisList[name] === undefined ){
      delete DiagnosisList[name]
    }
    else if(!TestResultList[name] === undefined ){
      delete TestResultList[name]
    }
    else if(!PictureList[name] === undefined ){
      delete PictureList[name]
    }
  }

  remove = (name) => {
    delete data[name]
    removeFromList(name)
  }

  confirm() {
    const formValues = this.formGenerator.getValues();
    var medicineNumber = 0;
    var appointmentsNumber = 0;
    var diagnosisNumber = 0;
    var testResultsNumber = 0;
    var medicines = [];
    var appointments = [];
    var diagnosis = [];
    var testResults = [];

    for(var key in data) {
      if(data.hasOwnProperty(key)){
        var key_string = JSON.stringify(key)
        if(key_string.includes('Medicine')){
          medicines.push(data[key]);
          medicineNumber++;
        }
        else if (key_string.includes('Appointment')) {
          appointments.push(data[key]);
          appointmentsNumber++;
        }
        else if (key_string.includes('Diagnosis')) {
          diagnosis.push(data[key]);
          diagnosisNumber++;
        }
        else{
          testResults.push(data[key]);
          testResultsNumber++;
        }
      }
    }
    var patientName = formValues['patientName']
    var docName = formValues['docName']
    var date = formValues['date']
    var amounts = {
        "medicines": medicineNumber,
        "appointments": appointmentsNumber,
        "diagnosis": diagnosisNumber,
        "testResults": testResultsNumber
    }
    var newVar = {
      patientName: patientName,
      docName: docName,
      date: date,
      amount: amounts,
      medicines: medicines,
      appointments: appointments,
      diagnosis: diagnosis,
      testResults: testResults
    }
    console.log(newVar)

    // var userId = firebase.auth().currentUser.uid;
    // var that = this;
    // firebase.database().ref("users/" + userId+ "/data/Prescriptions/").push(formValues)
    medicinesList = [];
    AppointmentList = [];
    DiagnosisList = [];
    TestResultList = [];
    PictureList = [];
    data= {};

    this.props.navigation.navigate('Prescriptions');
  }

  addMed = () => {
    var key = medicinesList.length + 1;
    var name = 'Medicine ' + key;
    var newVar = {
      name,
      data,
      medicinesList
    }
    this.props.navigation.navigate('MedicineForm', {newVar});
  }

  addAppointment = () => {
    var key = AppointmentList.length + 1;
    var name = 'Appointment ' + key;
    var newVar = {
      name,
      data,
      AppointmentList
    }
    this.props.navigation.navigate('AppointmentForm', {newVar});
  }

  addDiagnosis = () => {
    var key = DiagnosisList.length + 1;
    var name = 'Diagnosis ' + key;
    var newVar = {
      name,
      data,
      DiagnosisList
    }
    this.props.navigation.navigate('DiagnosisForm', {newVar});
  }

  addTestResult = () => {
    var key = TestResultList.length + 1;
    var name = 'Test Result ' + key;
    var newVar = {
      name,
      data,
      TestResultList
    }
    this.props.navigation.navigate('TestResultForm', {newVar});
  }

  addPicture = () => {
    var key = PictureList.length + 1;
    var name = 'Image ' + key;
    var newVar = {
      name,
      data,
      PictureList
    }
    this.props.navigation.navigate('TestResultCamera', {newVar})
  }

  renderFormMedicine = (item) => {
    var name = item;
    var newVar = {
      name,
      data,
      medicinesList
    }
    this.props.navigation.navigate('MedicineForm', {newVar});
  }

  renderFormAppointment = (item) => {
    var name = item;
    var newVar = {
      name,
      data,
      AppointmentList
    }
    this.props.navigation.navigate('AppointmentForm', {newVar});
  }

  renderFormDiagnosis = (item) => {
    var name = item;
    var newVar = {
      name,
      data,
      DiagnosisList
    }
    this.props.navigation.navigate('DiagnosisForm', {newVar});
  }

  renderFormTestResult = (item) => {
    var name = item;
    var newVar = {
      name,
      data,
      TestResultList
    }
    this.props.navigation.navigate('TestResultForm', {newVar});
  }

  renderFormPictures = (item) => {
    var name = item;
    var newVar = {
      name,
      data,
      PictureList
    }
    this.props.navigation.navigate('TestResultCamera', {newVar});
  }

  render() {
    data = this.props.navigation.state.params.newVar.data;
    console.log(data)
    if(this.props.navigation.state.params.newVar.hasOwnProperty('medicinesList')){
      medicinesList = this.props.navigation.state.params.newVar.medicinesList
    }
    if(this.props.navigation.state.params.newVar.hasOwnProperty('AppointmentList')){
      AppointmentList = this.props.navigation.state.params.newVar.AppointmentList
    }
    if(this.props.navigation.state.params.newVar.hasOwnProperty('DiagnosisList')){
      DiagnosisList = this.props.navigation.state.params.newVar.DiagnosisList
    }
    if(this.props.navigation.state.params.newVar.hasOwnProperty('TestResultList')){
      TestResultList = this.props.navigation.state.params.newVar.TestResultList
    }
    if(this.props.navigation.state.params.newVar.hasOwnProperty('PictureList')){
      PictureList = this.props.navigation.state.params.newVar.PictureList
    }


    return (

      <Container style={styles.container} contentContainerStyle={styles.contentContainer}>

        <Content>

          <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
            <Button small onPress={this.addMed}>
              <Text> Medicine </Text>
            </Button>
            <Button small onPress={this.addAppointment}>
              <Text> Appointment </Text>
            </Button>
            <Button small onPress={this.addDiagnosis}>
              <Text> Diagnosis </Text>
            </Button>
            <Button small onPress={this.addTestResult}>
              <Text> Test Results </Text>
            </Button>
            <Button small iconLeft onPress={this.addPicture}>
              <Ionicons name='md-camera' size={23} />
              <Text>Picture</Text>
            </Button>
          </View>

          <View>
            <GenerateForm
              ref={(c) => {
                this.formGenerator = c;
              }}
              fields={this.state.fields}
            />
          </View>

          <ListItem itemDivider>
              <Text>Medicines</Text>
            </ListItem>
          <List dataArray={medicinesList}
            renderRow={(medicine) =>
              <ListItem button onPress={() => this.renderFormMedicine(medicine)}>
                <Text>{medicine}</Text>
              </ListItem>
            }>
          </List>

          <ListItem itemDivider>
              <Text>Appointments</Text>
            </ListItem>
          <List dataArray={AppointmentList}
            renderRow={(appointment) =>
              <ListItem button onPress={() => this.renderFormAppointment(appointment)}>
                <Text>{appointment}</Text>
              </ListItem>
            }>
          </List>

          <ListItem itemDivider>
              <Text>Diagnosis</Text>
            </ListItem>
          <List dataArray={DiagnosisList}
            renderRow={(diagnosis) =>
              <ListItem button onPress={() => this.renderFormDiagnosis(diagnosis)}>
                <Text>{diagnosis}</Text>
              </ListItem>
            }>
          </List>

          <ListItem itemDivider>
              <Text>Test Results</Text>
            </ListItem>
          <List dataArray={TestResultList}
            renderRow={(testResults) =>
              <ListItem button onPress={() => this.renderFormTestResult(testResults)}>
                <Text>{testResults}</Text>
              </ListItem>
            }>
          </List>

          <ListItem itemDivider >
              <Text>Picture</Text>
            </ListItem>
          <List dataArray={PictureList}
            renderRow={(pic) =>
              <ListItem button onPress={() => this.renderFormPictures(pic)}>
                <Text>{pic}</Text>
              </ListItem>
            }>
          </List>

          <View style={styles.submitButton}>
            <Button block onPress={() => this.confirm()}>
              <Text>Confirm</Text>
            </Button>
          </View>

        </Content>

      </Container>

    );
  }


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
