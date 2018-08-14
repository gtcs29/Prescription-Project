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
  ActivityIndicator,
  Alert
} from 'react-native';
import { WebBrowser, Notifications, Permissions} from 'expo';
import { ListView } from '@shoutem/ui';
import { MonoText } from '../components/StyledText';
import { Tab, Accordion, Container, Button, Text, Content, Form, Item, Label, Input, Header, Body, Title, Card, CardItem} from 'native-base';
import firebase from 'firebase';

import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
// import Permissions from 'react-native-permissions'

// import RNCalendarReminders from 'react-native-calendar-reminders';


const window = Dimensions.get('window');



// firebaseData = [
//   {
//     docName: "Test doc",
//     patientName: "Test patient",
//     date: "Test date",
//     Medicine0: {
//       endDate: new Date(2019, 7, 5),
//       startDate: new Date(2018, 7, 5),
//       day:
//       time0: ,
//       time1: ,
//       time2: ,
//       time3: null
//     }
//
//   }
// ]

const localNotification =  {
  title: 'test name',
    body: 'test body', // (string) — body text of the notification.
    ios: { // (optional) (object) — notification configuration specific to iOS.
      sound: true // (optional) (boolean) — if true, play a sound. Default: false.
    },
android: // (optional) (object) — notification configuration specific to Android.
    {
      sound: true, // (optional) (boolean) — if true, play a sound. Default: false.
      priority: 'high', // (optional) (min | low | high | max) — android may present notifications according to the priority, for example a high priority notification will likely to be shown as a heads-up notification.
      sticky: false, // (optional) (boolean) — if true, the notification will be sticky and not dismissable by user. The notification must be programmatically dismissed. Default: false.
      vibrate: true // (optional) (boolean or array) — if true, vibrate the device. An array can be supplied to specify the vibration pattern, e.g. - [ 0, 500 ].
    },
    show_in_foreground: true
  }



export default class RemindersScreen extends React.Component {
  static navigationOptions = {
    title: 'Links',
  };

  constructor(props)
  {
      super(props);

      this.state = {idR: "", eventS: {}};
      this.onDayPress = this.onDayPress.bind(this);
  }
  async componentWillMount() {
    const { Permissions } = Expo;
    const { status, allowsSound, allowsAlert, allowsBadge} = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    if (status === 'granted') {
      console.log(allowsBadge);
      console.log(allowsAlert);
      console.log(allowsSound);
      console.log(status);
    } else {
      throw new Error('Notification permission not granted');
    }
  }

  // listener = function() {
  //   Alert.alert(
  //     'Alert Title',
  //     'My Alert Msg',
  //     [
  //       {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
  //       {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
  //       {text: 'OK', onPress: () => console.log('OK Pressed')},
  //     ],
  //     { cancelable: false }
  //   )
  // }

  handlePress = () => {
    var eventObject = Expo.Notifications.addListener(()=>
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

    this.setState({eventS: eventObject})

    let t = new Date();
    t.setSeconds(t.getSeconds() + 10);

    var schedulingOptions = {
        time: t // (date or number) — A Date object representing when to fire the notification or a number in Unix epoch time. Example: (new Date()).getTime() + 1000 is one second from now.
      };

    Expo.Notifications.scheduleLocalNotificationAsync (
        localNotification,
        schedulingOptions
      )
    .then((id) => {
      this.setState({idR: id});
      console.log(id);
    })
    .catch((error) =>{
      console.log(error);
    })
  }

  clearAll = () =>{
    Expo.Notifications.cancelAllScheduledNotificationsAsync();
  }

  handleDelete = () => {
    Expo.Notifications.cancelScheduledNotificationAsync(this.state.idR);

  }

  render() {


    return (
      <Container>
        <Header>
          <Text> Reminders </Text>
        </Header>
        <Content>
          <Button onPress={this.handlePress}>
            <Text>Press Me</Text>
          </Button>
          <Button onPress={this.clearAll}>
            <Text>Clear All</Text>
          </Button>
          <Button onPress={this.handleDelete}>
            <Text>Delete latest</Text>
          </Button>
        </Content>
      </Container>
    );
  }


onDayPress(day) {
  this.setState({
    selected: day.dateString
  });
}
}


const styles = StyleSheet.create({
calendar: {
  borderTopWidth: 1,
  paddingTop: 5,
  borderBottomWidth: 1,
  borderColor: '#eee',
  height: 350
},
text: {
  textAlign: 'center',
  borderColor: '#bbb',
  padding: 10,
  backgroundColor: '#eee'
},
container: {
  flex: 1,
  backgroundColor: 'gray'
}
});
