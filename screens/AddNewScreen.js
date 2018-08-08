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
import { List, ListItem, Icon, Tab, Accordion, Container, Button, Text, Content, Form, Item, Label, Input, Header, Body, Title, Card, CardItem, Picker} from 'native-base';
import firebase from 'firebase';

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

var items = [];
var data= [

];

export default class AddNewScreen extends React.Component {
  static navigationOptions = {
    title: 'Prescriptions!',
  };

  constructor(props) {
    super(props);
    this.confirm = this.confirm.bind(this);
    this.state = {fields: tempFields, selected1: 'ADD', }
  }

  componentWillMount() {
    console.log(this.props.navigation.state.params.newVar);
    if(this.props.navigation.state.params.newVar.hasOwnProperty('data')){
      console.log('bb')
      // console.log(this.props.navigation.state.params.newVar.key)
      data = this.props.navigation.state.params.newVar.data;
      // console.log(data[this.props.navigation.state.params.newVar.key]);
      // form = this.props.navigation.state.params.newVar.data[this.props.navigation.state.params.newVar.key-1]
    }
  }

  confirm() {
    const formValues = this.formGenerator.getValues();

    formValues["date"] = formValues["date"].toString();
    formValues['date'] = formValues['date'].split(" ")[0]+ " " + formValues['date'].split(" ")[1]+" " +formValues['date'].split(" ")[2]+" " +formValues['date'].split(" ")[3];

    formValues["amounts"] = {
      "medicines": this.props.navigation.state.params.newVar.meds,
      "appointments": this.props.navigation.state.params.newVar.appointments,
      "diagnosis": this.props.navigation.state.params.newVar.diagnosis,
      "testResults": this.props.navigation.state.params.newVar.testres
    }
    var i;
    for(i=0; i < this.props.navigation.state.params.newVar.appointments; i++) {
      formValues['Appointment'+i] = formValues['Appointment'+i].toString();
      formValues['Appointment'+i] = formValues['Appointment'+i].split(" ")[0]+" " +formValues['Appointment'+i].split(" ")[1]+" " +formValues['Appointment'+i].split(" ")[2]+" " +formValues['Appointment'+i].split(" ")[3];
    }
    console.log(formValues);
    var userId = firebase.auth().currentUser.uid;
    var that = this;
    firebase.database().ref("users/" + userId+ "/data/Prescriptions/").push(formValues)

    this.props.navigation.navigate('Prescriptions');
  }

  addMed = () => {
    var key = items.length + 1;
    var name = 'Medicine ' + key;
    items.push(name);
    console.log(items);
    var newVar = {
      key,
      data
    }
    this.props.navigation.navigate('MedicineForm', {newVar});
  }

  renderForm = (item) => {
    console.log(item);
    var key = parseInt(item.charAt(item.length-1));
    console.log(key);
    var newVar = {
      key,
      data
    }
    // console.log(newVar);
    this.props.navigation.navigate('MedicineForm', {newVar});
  }
  //
  // componentWillMount() {
  //   if(this.props.navigation.state.params.formValues)
  // }

  render() {

    return (

      <Container style={styles.container} contentContainerStyle={styles.contentContainer}>

        <Content>

          <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
            <Button small onPress={this.addMed}>
              <Text> Medicine </Text>
            </Button>
            <Button small>
              <Text> Appointment </Text>
            </Button>
            <Button small>
              <Text> Test Result </Text>
            </Button>
            <Button small>
              <Text> Medicine </Text>
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

          <List dataArray={items}
            renderRow={(item) =>
              <ListItem button onPress={() => this.renderForm(item)}>
                <Text>{item}</Text>
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
