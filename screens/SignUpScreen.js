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
  Image,
  Keyboard
} from 'react-native';
import { createStackNavigator, createSwitchNavigator } from 'react-navigation';
import { Container, Button, Text, Content, Form, Item, Label, Input, Header, Body, Title, Toast} from 'native-base';
const window = Dimensions.get('window');
import axios from 'axios';
import firebase from 'firebase';

const ROOT_URL = 'https://us-central1-prescriptions-gtcs29.cloudfunctions.net'

export default class SignUpScreen extends React.Component {
  static navigationOptions = {
    title: null,
  };

  state = {
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    email: "",
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
              <Label>Username</Label>
              <Input defaultValue={this.state.username} autoCapitalize={'none'} autoCorrect={false} onChangeText={username => this.setState({ username })}/>
            </Item>
            <Item stackedLabel>
              <Label>Email</Label>
              <Input defaultValue={this.state.email} autoCapitalize={'none'} autoCorrect={false} onChangeText={email => this.setState({ email })}/>
            </Item>
            <Item stackedLabel >
              <Label>Password</Label>
              <Input defaultValue={this.state.password} autoCapitalize={'none'} autoCorrect={false} secureTextEntry={true} onChangeText={password => this.setState({ password })} />
            </Item>
            <Item stackedLabel >
              <Label>Verify Password</Label>
              <Input defaultValue={this.state.verifyPassword} autoCapitalize={'none'} autoCorrect={false} secureTextEntry={true} onChangeText={verifyPassword => this.setState({ verifyPassword })} />
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
    Keyboard.dismiss();
    const {email, password, verifyPassword, username} = this.state
    var hasNumber = /\d/;
    var hasSpecialCharacters = new RegExp(/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/);

    if(!email.includes("@")){
      this.setState({ error: 'Email is badly formatted.', email: '', password: '', verifyPassword: ''})
      return           (
        Toast.show({
            text: 'Fix Email Format',
            buttonText: "Okay",
            buttonTextStyle: { color: "#008000" },
            buttonStyle: { backgroundColor: "#5cb85c" }
          })
        )
    }
    if(password !== verifyPassword ){
      this.setState({ error: 'Passwords do not match.', password: '', verifyPassword: ''})
      return           (
        Toast.show({
            text: 'Passwords don\'t match',
            buttonText: "Okay",
            buttonTextStyle: { color: "#008000" },
            buttonStyle: { backgroundColor: "#5cb85c" }
          })
        )
    }
    if(password.length < 8 ){
      this.setState({ error: 'Password must be more than 8 characters.', password: '', verifyPassword: ''})
      return           (
        Toast.show({
            text: 'Password Too Short',
            buttonText: "Okay",
            buttonTextStyle: { color: "#008000" },
            buttonStyle: { backgroundColor: "#5cb85c" }
          })
        )
    }
    if(!hasNumber.test(password) ){
      this.setState({ error: 'Password must contain a number.', password: '', verifyPassword: ''})
      return           (
        Toast.show({
            text: this.state.error,
            buttonText: "Okay",
            buttonTextStyle: { color: "#008000" },
            buttonStyle: { backgroundColor: "#5cb85c" }
          })
        )
    }
    if(hasSpecialCharacters.test(password) ){
      this.setState({ error: 'Password can only contain @ or _ as a special character.', password: '', verifyPassword: ''})
      return           (
        Toast.show({
            text: 'Invalid Characters',
            buttonText: "Okay",
            buttonTextStyle: { color: "#008000" },
            buttonStyle: { backgroundColor: "#5cb85c" }
          })
        )
    }
    try {
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        var user = firebase.auth().currentUser;
        var ref = firebase.database().ref("users/" + user.userId+ "/auth/reset_password");
        user.updateProfile({ displayName: username })
        ref.set({ passwordReset: false })
        await axios.post(`${ROOT_URL}/verifyEmail`, { email: email })
        this.props.navigation.navigate('emailVerification', {email});
      }
    catch (err) {
      console.log(err);
      console.log(err.code)
      switch(err.code) {
        case 'auth/email-already-in-use':
          Toast.show({
              text: 'Email is already in use',
              buttonText: "Okay",
              buttonTextStyle: { color: "#008000" },
              buttonStyle: { backgroundColor: "#5cb85c" }
            })
      }

    }
  }

}

const styles = StyleSheet.create({
  container: {
    height: 60,
    flex: 1,

  },
});
