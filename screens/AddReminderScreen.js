import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  AsyncStorage,
  Alert
} from 'react-native';
import { ListView } from '@shoutem/ui';
import { MonoText } from '../components/StyledText';
import { List, ListItem, Icon, Tab, Accordion, Container, Button, Text, Content, Form, Item, Label, Input, Header, Body, Title, Card, CardItem, Picker, Separator} from 'native-base';
import firebase from 'firebase';
import Ionicons from "react-native-vector-icons/Ionicons";
import Enotype from "react-native-vector-icons/Entypo";

import Menu, { MenuItem } from 'react-native-material-menu';

import { WebBrowser, Notifications, Permissions} from 'expo';

import GenerateForm from 'react-native-form-builder';

const eventObject = Expo.Notifications.addListener(()=>
  Alert.alert(
    'Alert Title',
    'My Alert Msg',
    [
      {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
      {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ],
    { cancelable: false }
  )
)

const tempFields = [
  {
    type: 'text',
    name: 'medName',
    icon: 'ios-lock',
    required: true,
    label: 'Reminder Body',
  },
  {
    type: 'date',
    name: 'startDate',
    mode: 'date',
    required: true,
    label: 'Start Date',
    maxDate: new Date(2300, 7, 15),
    minDate: new Date(1880, 7, 15),
  },
  {
    type: 'date',
    name: 'endDate',
    mode: 'date',
    required: true,
    label: 'End Date',
    maxDate: new Date(2300, 7, 15),
    minDate: new Date(1880, 7, 15),
  },
  {
    type: 'switch',
    name: 'repeat',
    label: 'Repeat',
  },
]

var medicinesList = [];
var AppointmentList = [];
var DiagnosisList = [];
var TestResultList = [];
var PictureList = [];
var data= {};
var reminderIds = [];

var idR = "";

export default class AddReminderScreen extends React.Component {
  static navigationOptions = {
    title: 'Prescriptions!',
  };

  constructor(props) {
    super(props);
    this.confirm = this.confirm.bind(this);
     this.state = {fields: tempFields, selected1: 'ADD', idR: "", eventS: {}, delete: false}
  }

  async componentWillMount() {
    const { Permissions } = Expo;
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    if (status === 'granted') {
      console.log(status);
    } else {
      throw new Error('Notification permission not granted');
    }
  }


  confirm = async() => {
    const formValues = this.formGenerator.getValues();
    formValues['type'] = "Custom"
    this.props.navigation.navigate('TabReminders');
  }

  renderDelete() {
    return(
      <Ionicons.Button name="ios-trash" backgroundColor='#ffffff' size={30} color='red' onPress={this.deleteAll} />
    )
  }


  handlePress = (medName, body, date, time) => {
    var localNotification =  {
      title: medName,
      body: medName,
      ios: {
        sound: true
      },
      android:
      {
        sound: true,
        priority: 'high',
        sticky: false,
        vibrate: true
      },
    }

    var dateTime = date + " " + time;
    let t = Date.parse(dateTime);

      var schedulingOptions = {
          time: t, // (date or number) — A Date object representing when to fire the notification or a number in Unix epoch time. Example: (new Date()).getTime() + 1000 is one second from now.
      }
    return Expo.Notifications.scheduleLocalNotificationAsync (
        localNotification,
        schedulingOptions
      )
    .then((id) => {
      reminderIds.push(id);
      this.setState({idR: id});
      console.log(id);
      return(id)
    })
    .catch((error) =>{
      console.log(error);
      return(error)
    })
  }

  handleDelete = () => {
      Expo.Notifications.cancelScheduledNotificationAsync(this.state.idR);
  }

  render() {

    return (

      <Container style={styles.container} contentContainerStyle={styles.contentContainer}>

        <Content>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            {this.renderDelete()}
          </View>

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
    padding: 10,
    backgroundColor: '#fff',
  },

  submitButton: {
    paddingHorizontal: 10,
    paddingTop: 20,
  },

});
