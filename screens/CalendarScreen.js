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
  ActivityIndicator
} from 'react-native';
import { WebBrowser } from 'expo';
import { ListView } from '@shoutem/ui';
import { MonoText } from '../components/StyledText';
import { Tabs, Tab, Accordion, Container, Button, Text, Content, Form, Item, Label, Input, Header, Body, Title, Card, CardItem} from 'native-base';
import firebase from 'firebase';

import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

const window = Dimensions.get('window');

firebaseData = [
  {
    docName: "Test doc",
    patientName: ""
  }
]

export default class CalendarScreen extends React.Component {
  static navigationOptions = {
    title: 'Links',
  };
  constructor(props)
  {
      super(props);

      this.state = {};
      this.onDayPress = this.onDayPress.bind(this);

  }

  onDayPress(day) {
      this.setState({
        selected: day.dateString
      });

      this.props.navigation.navigate('Prescriptions');
    }

  render() {

    return (
      <Container>
        <Content>
          <Calendar
            onDayPress={this.onDayPress}
            style={styles.calendar}
            hideExtraDays
            showWeekNumbers
            // markedDates={{[this.state.selected]: {selected: true, disableTouchEvent: true, selectedDotColor: 'orange'}}}
            markedDates={{
              '2018-05-23': {selected: true, marked: true},
              '2018-06-24': {selected: true, marked: true, dotColor: 'green'},
              '2018-07-25': {marked: true, dotColor: 'red'},
              '2018-08-26': {marked: true},
              '2018-09-27': {disabled: true, activeOpacity: 0}
            }}

            current={'2018-05-16'}
            minDate={'2018-05-10'}
            maxDate={'2020-05-29'}
          />

        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },

  calendar: {
  borderTopWidth: 1,
  paddingTop: 30,
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
})
