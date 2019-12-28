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
import PhotoGrid from './PhotoGrid.js'


var IMAGES = []
export default class AutoFillScreen extends React.Component {
  static navigationOptions = {
    title: 'AutoFill!',
  };

  constructor(props) {
    super(props);
    var i = 0;

    this.state = {selected1: 'ADD', doc: "", patientName: "", date: null}
  }

  createImageList = () => {
    if (this.props.navigation.state.params.newVar.hasOwnProperty('ImageList')) {
      var IMAGES = this.props.navigation.state.params.newVar.ImageList
    }
  }


  confirm = () => {

    data = ""
    autoFill = ""


    fetch('http://mocktarget.apigee.net').then(function (response) {
            console.log(response)
          });

    IMAGES = []

    var newVar =
    {
      data,
      autoFill
    }
    this.props.navigation.navigate('AddNew', {newVar})
  }

  render() {

    return (

      <Container style={styles.container} contentContainerStyle={styles.contentContainer}>

        <Content>

        <View>
          {this.createImageList()}
        </View>

        <View style={styles.submitButton}>
          <Button block onPress={() => this.addImages()}>
            <Text>Add Images</Text>
          </Button>
        </View>

          <PhotoGrid source={IMAGES} onPressImage={uri => this.showImage(uri)}/>


          <View style={styles.submitButton}>
            <Button block onPress={() => this.confirm()}>
              <Text>Confirm</Text>
            </Button>
          </View>

        </Content>

      </Container>

    );
  }
  addImages = () => {
    var ImageList = IMAGES
    var data = this.props.navigation.state.params.newVar.data

    var newVar = {
      data,
      ImageList
    }
    this.props.navigation.navigate('AddPic', {newVar});
  }

}

const styles = StyleSheet.create({
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
