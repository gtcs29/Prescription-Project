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


const window = Dimensions.get('window');

const idR = "";


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
  }

  const m = null;
var counter = 0;
export default class TabRemindersScreen extends React.Component {
  static navigationOptions = {
    title: 'Links',
  };

  constructor(props)
  {
      super(props);

      this.state = {idR: "", eventS: {}, dataPatient2: [], loaded: false};
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

  componentDidMount() {
    var userId = firebase.auth().currentUser.uid;
    var that = this;
    console.log(userId);
    firebase.database().ref("users/" + userId+ "/data/Prescriptions/").on('value', function(snapshot) {
      that.setState({loaded: true});
      snapshot.forEach(function(childSnapshot) {

        var childData = childSnapshot.val();
        // dataPatient.push(childData);

        that.setState(prevState => {
          return {
            dataPatient2: prevState.dataPatient2.concat(childData)
          };
        });

      });
    });
  }

  handlePress = () => {


    let t = new Date();
    m = new Date();
    t.setSeconds(t.getSeconds()+10);
    m.setSeconds(t.getSeconds() + 70);



    // if (t !== m)
// {
  var schedulingOptions = {
        time: t, // (date or number) — A Date object representing when to fire the notification or a number in Unix epoch time. Example: (new Date()).getTime() + 1000 is one second from now.
        repeat: "minute"
      }
    // }
    //   else {
    //     var schedulingOptions = {
    //             time: t // (date or number) — A Date object representing when to fire the notification or a number in Unix epoch time. Example: (new Date()).getTime() + 1000 is one second from now.
    //           }
    //   }

    console.log('blah');
    Expo.Notifications.scheduleLocalNotificationAsync (
        localNotification,
        schedulingOptions
      )
    .then((id) => {
      idR = id;

      console.log(id);
    })
    .catch((error) =>{
      console.log(error);
    })
  }

  clearAll = () =>{
    Expo.Notifications.cancelAllScheduledNotificationsAsync();
  }

  handleDelete = (id) => {
    Expo.Notifications.cancelScheduledNotificationAsync(id);

  }

  renderRow(dataPatient) {

    // dataPatient["date"] = dataPatient["date"].toString();
    // dataPatient['date'] = dataPatient['date'].split(" ")[0]+ " " + dataPatient['date'].split(" ")[1]+" " +dataPatient['date'].split(" ")[2]+" " +dataPatient['date'].split(" ")[3];
    if(dataPatient.hasOwnProperty('appointments') === false) {
      dataPatient['appointments'] = [];
    }
    if(dataPatient.hasOwnProperty('medicines') === false) {
      dataPatient['medicines'] = [];
    }




    for(var i = 0; i < dataPatient.amount.medicines; i++) {
      var timeList = dataPatient["medicines"][i]["Times"];
      for(var n = 1; n < Object.keys(dataPatient["medicines"][i]["Times"]).length+1; n++) {
        time = "Time" + n;
        if (timeList[time] !== null) {
          // timeList[time] = timeList[time].toString();
          timeList[time]= timeList[time].split(" ")[0];

        }
      }
    }

    counter = counter +1;

    for (var i = 0; i < dataPatient.amount.medicines; i++) {
      console.log('reminderscheck')
      console.log(dataPatient.medicines[i]);
        if(dataPatient.medicines[i].hasOwnProperty('reminders') === false) {
          dataPatient.medicines[i]['reminders'] = [];
        }

        console.log(dataPatient.medicines[i]);
       for(var n = 0; n < dataPatient.medicines[i]['reminders'].length; n++)  {
          if (counter % 2 == 0 ) {
          return (
            <ImageBackground style={{width: window.width, height: 150}} source={require('../assets/images/purpleBackground.png')} >
              <View style={styles.ListViewEven}>

                <View>
                  <Text style={{fontWeight: "bold"}}>{dataPatient.docName}</Text>
                  <Text>{dataPatient.patientName}</Text>
                  <Text>{dataPatient.medicines[i].medName}</Text>
                  <Text>{dataPatient.medicines[i].Times[n]}</Text>
                  <Text> From {dataPatient.medicines[i].startDate} to {dataPatient.medicines[i].endDate}</Text>
                </View>
                <View style={{justifyContent: 'center'}}>
                  <Button block style={{backgroundColor: "#c1514d"}}
                    onPress={() => this.handleDelete(dataPatient.medicines[i]['reminders'][n])}>
                    <Text>Delete</Text>
                  </Button>
                </View>
              </View>
            </ImageBackground>
          );
        }
        else {
          return (
            <View style={styles.ListViewOdd}>

              <View>
                <Text style={{fontWeight: "bold"}}>{dataPatient.docName}</Text>
                <Text>{dataPatient.patientName}</Text>
                <Text>{dataPatient.medicines[i].medName}</Text>
                <Text>{dataPatient.medicines[i].Times[n]}</Text>
                <Text> From {dataPatient.medicines[i].startDate} to {dataPatient.medicines[i].endDate}</Text>
              </View>
              <View style={{justifyContent: 'center'}}>
                <Button block style={{backgroundColor: "#c1514d"}}
                  onPress={() => this.handleDelete(dataPatient.medicines[i]['reminders'][n])}>
                  <Text>Delete</Text>
                </Button>
              </View>
            </View>
          );
        }
      }

    }
    return null;

  }

  render() {
    if (!this.state.loaded) return <ActivityIndicator size="large" color="#9abdb5" style={{paddingBottom: 20}} />;

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

          <ListView
            data={this.state.dataPatient2}
            renderRow={this.renderRow.bind(this)}
          />

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
