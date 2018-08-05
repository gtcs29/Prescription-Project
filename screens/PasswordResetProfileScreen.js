import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Dimensions,
  ImageBackground,
  Image
} from 'react-native';
import { createStackNavigator, createSwitchNavigator } from 'react-navigation';
import { Container, Button, Text, Content, Form, Item, Label, Input, Header, Body, Title} from 'native-base';
const window = Dimensions.get('window');
import axios from 'axios';

import firebase from 'firebase';


const ROOT_URL = 'https://us-central1-prescriptions-gtcs29.cloudfunctions.net'

export default class PasswordResetProfileScreen extends React.Component {
  static navigationOptions = {
    title: null,
  };

  state = {
    oldPassword: "",
    password: "",
    verifyPassword: "",
    error: ""
  }

  render() {
    return (

      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>

        <Content style={{paddingTop: 50}}>
          <Image style={{width: window.width, height: 150}} source={require('../assets/images/logoTeal.png')} />

          <Form style={{paddingVertical:20}}>
            <Item stackedLabel>
              <Label>Old Password</Label>
              <Input autoCapitalize={'none'} autoCorrect={false} onChangeText={oldPassword => this.setState({ oldPassword })}/>
            </Item>
            <Item stackedLabel >
              <Label>New Password</Label>
              <Input autoCapitalize={'none'} autoCorrect={false} secureTextEntry={true} onChangeText={password => this.setState({ password })} />
            </Item>
            <Item stackedLabel >
              <Label>Verify New Password</Label>
              <Input autoCapitalize={'none'} autoCorrect={false} secureTextEntry={true} onChangeText={verifyPassword => this.setState({ verifyPassword })} />
            </Item>
            <View style={{ height: 10 }} />
          </Form>

          <Button style={{backgroundColor: '#9abdb5', marginHorizontal: 20, marginVertical: 10}} block onPress={this._verify} >
            <Text>Sign Up </Text>
          </Button>

        </Content>
        <View style={{ height: 20 }} />
      </KeyboardAvoidingView>
    );
  }

  _verify = async () => {
    console.log(this.state.error)
    var user = firebase.auth().currentUser;

    const {oldPassword, verifyPassword, password} = this.state
    var hasNumber = /\d/;
    var hasSpecialCharacters = new RegExp(/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/);

    if(password !== verifyPassword ){
      return this.setState({ error: 'Passwords do not match.', password: '', verifyPassword: ''})
    }
    if(password.length < 8 ){
      return this.setState({ error: 'Password must be more than 8 characters.', password: '', verifyPassword: ''})
    }
    if(!hasNumber.test(password) ){
      return this.setState({ error: 'Password must contain a number.', password: '', verifyPassword: ''})
    }
    if(hasSpecialCharacters.test(password) ){
      return this.setState({ error: 'Password can only contain @ or _ as a special character.', password: '', verifyPassword: ''})
    }


    user.updateProfile({
      password: password
    }).then(function() {
      this.props.navigation.navigate('Main')
    }).catch(function(error) {
      this.setState({error: error.toString()})
    });
  }

}

const styles = StyleSheet.create({
  container: {
    height: 60,
    flex: 1,

  },
});
