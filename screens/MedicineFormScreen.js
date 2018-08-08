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
import { Icon, Tab, Accordion, Container, Button, Text, Content, Form, Item, Label, Input, Header, Body, Title, Card, CardItem, Picker} from 'native-base';
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

var form;

export default class MedicineFormScreen extends React.Component {
  static navigationOptions = {
    title: 'Prescriptions!',
  };
  componentWillMount() {
    console.log(this.props.navigation.state.params.newVar);
    if(this.props.navigation.state.params.newVar.hasOwnProperty('data')){
      console.log('bb')
      console.log(this.props.navigation.state.params.newVar.key)
      // console.log(data[this.props.navigation.state.params.newVar.key]);
      form = this.props.navigation.state.params.newVar.data[this.props.navigation.state.params.newVar.key-1]
    }
  }

  // componentWillMount = async() => {
  //   console.log(.id);
  //   try {
  //      form = await AsyncStorage.getItem(this.props.navigation.state.params.newVar.id.toString());
  //      form = JSON.parse(form);
  //    } catch (error) {
  //      console.log(error);
  //    }
  // }

  constructor(props) {
    super(props);
    var i = 0;
    this.state = {fields: tempFields, selected1: 'ADD', doc: "", patientName: "", date: null}
  }

  confirm = () => {
    const formValues = this.formGenerator.getValues();
    console.log(formValues)
    var data = this.props.navigation.state.params.newVar.data
    var key = this.props.navigation.state.params.newVar.key
    if(data.length === key-1){
      data.push(formValues)
    }
    else{
      data[key-1] = formValues
    }

    var newVar = {
      key,
      data
    }
    this.props.navigation.navigate('AddNew', {newVar})
    // try {
    //   if (formValues !== null)
    //   {
    //     await AsyncStorage.setItem(this.props.navigation.state.params.newVar.id.toString(), JSON.stringify(formValues));
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
  }

  render() {

    return (

      <Container style={styles.container} contentContainerStyle={styles.contentContainer}>

        <Content>

          <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>

          </View>
          <View>
            <GenerateForm
              ref={(c) => {
                this.formGenerator = c;
              }}
              fields={this.state.fields}
              formData = { form }
            />
          </View>

          <View style={styles.submitButton}>
            <Button block onPress={() => this.confirm()}>
              <Text>Save</Text>
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
