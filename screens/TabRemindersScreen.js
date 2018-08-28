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
import { Left, Right, List, ListItem, Tab, Accordion, Container, Button, Text, Content, Form, Item, Label, Input, Header, Body, Title, Card, CardItem} from 'native-base';
import firebase from 'firebase';

import { Calendar, CalendarList, Agenda } from 'react-native-calendars';


const window = Dimensions.get('window');


var counter = 0;

export default class TabRemindersScreen extends React.Component {
  static navigationOptions = {
    title: 'Links',
  };

  constructor(props)
  {
      super(props);

      this.state = {idR: "", eventS: {}, dataPatient2: [], loaded: false};
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
    firebase.database().ref("users/" + userId+ "/sorted/reminders").on('value', function(snapshot) {
      that.setState({loaded: true});
      that.setState({dataPatient2: []});

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

  var schedulingOptions = {
        time: t, // (date or number) — A Date object representing when to fire the notification or a number in Unix epoch time. Example: (new Date()).getTime() + 1000 is one second from now.
        repeat: "minute"
      }


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

  handleDelete = (dataPatient, id) => {
    Expo.Notifications.cancelScheduledNotificationAsync(id);


  }

  showAll = (data) => {
    return Object.keys(data).map((key, i) => {

      return (
        <View>
          <List>
            <ListItem itemHeader first>
              <Text>{key}</Text>
            </ListItem>
          </List>
        <List
          style={{paddingTop: 20}}
          dataArray={data[key]}
          renderRow={(item) =>
             <ListItem thumbnail>
              <Left style={{width: 100}}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                  <View>
                    <Text style={{fontSize: 10}}> Start </Text>

                    <View style={{flexDirection: 'column', borderLeftWidth: 0.3, borderTopWidth: 0.3, borderBottomWidth: 2.0, borderRightWidth: 2.0, borderColor: "#6b5e61", width: 50, borderRadius: 4, shadowOffset:{  width: 5,  height: 5 },
                        shadowColor: '#a59fa0',
                        shadowOpacity: 1.0,
                        elevation: 1,
                        marginLeft: 5}}>
                      <ImageBackground style={{width: 48, height: 16, marginTop: 4}} source={require('../assets/images/goldBackground.png')}>
                        <Text style={{fontSize: 12}}>{item.startDate.split(" ")[1]}</Text>
                      </ImageBackground>
                        <Text style={{fontSize: 22}}>{item.startDate.split(" ")[2]}</Text>
                        <Text style={{fontSize: 6}}>{item.startDate.split(" ")[3]}</Text>

                    </View>
                  </View>


                  <View>
                    <Text style={{fontSize: 10}}> End </Text>

                    <View style={{flexDirection: 'column', borderLeftWidth: 0.3, borderTopWidth: 0.3, borderBottomWidth: 2.0, borderRightWidth: 2.0, borderColor: "#6b5e61", width: 50, borderRadius: 4, shadowOffset:{  width: 5,  height: 5 },
                        shadowColor: '#a59fa0',
                        shadowOpacity: 1.0,
                        elevation: 1,
                        marginLeft: 5}}>
                        <ImageBackground style={{width: 48, height: 16, marginTop: 4}} source={require('../assets/images/goldBackground.png')}>
                          <Text style={{fontSize: 12}}>{item.endDate.split(" ")[1]}</Text>
                        </ImageBackground>
                          <Text style={{fontSize: 22}}>{item.endDate.split(" ")[2]}</Text>
                          <Text style={{fontSize: 6}}>{item.endDate.split(" ")[3]}</Text>
                    </View>
                  </View>

                </View>
              </Left>

              <Body>
                <Text style={{fontSize: 18, paddingLeft: 10}}>{item.medName}</Text>
                <Text style={{fontSize: 14, paddingLeft: 10}}>At {item.time}</Text>

              </Body>
              <Right>
                <Button transparent
                onPress={() => this.handleDelete(item, item.reminderId).bind(this)}>
                  <Text style={{color: '#DFBF86', fontSize: 15}}>Delete</Text>
                </Button>
              </Right>
             </ListItem>

           }
         >

        </List>
      </View>
      )
    })
  }

  render() {
    var dataAll = this.state.dataPatient2;

    dataAll.sort(function(a, b) {
      var dateA = new Date(a.startDate), dateB=new Date(b.startDate)
      return dateA-dateB //sort by date ascending
    })


    dataAll = dataAll.reverse();


    var dataByCategory = {}

    for(var i =0; i < dataAll.length; i++) {
      console.log(i);
      var category = dataAll[i].type
      console.log(dataAll[i]);

      if(dataByCategory.hasOwnProperty(category)) {
        dataByCategory[category].push(dataAll[i])

        dataByCategory[category].sort(function(a, b) {
          var dateA = new Date(a.startDate), dateB=new Date(b.startDate)
          return dateA-dateB //sort by date ascending
        })
        dataByCategory[category] = dataByCategory[category].reverse();

      }
      else {
        dataByCategory[category] = [dataAll[i]]
      }
    }


    // if (!this.state.loaded) return <ActivityIndicator size="large" color="#9abdb5" style={{paddingBottom: 20}} />;

    return (
      <Container>
        <Content>

          <Button small transparent onPress={this.clearAll}>
            <Text>Clear All</Text>
          </Button>

          <View>
           {this.showAll(dataByCategory)}
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
    borderBottomWidth:0,
    backgroundColor: '#fbf5f3',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  ListViewEven: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: '#000000',
    borderBottomWidth:0,
    // backgroundColor: '#edb0a2',
    paddingHorizontal: 20,
    paddingVertical: 20
  },
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
