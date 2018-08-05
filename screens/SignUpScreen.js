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
              <Input autoCapitalize={'none'} autoCorrect={false} onChangeText={username => this.setState({ username })}/>
            </Item>
            <Item stackedLabel>
              <Label>Email</Label>
              <Input autoCapitalize={'none'} autoCorrect={false} onChangeText={email => this.setState({ email })}/>
            </Item>
            <Item stackedLabel >
              <Label>Password</Label>
              <Input autoCapitalize={'none'} autoCorrect={false} secureTextEntry={true} onChangeText={password => this.setState({ password })} />
            </Item>
            <Item stackedLabel >
              <Label>Verify Password</Label>
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
    const {email, password, verifyPassword, username} = this.state
    var hasNumber = /\d/;
    var hasSpecialCharacters = new RegExp(/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/);

    if(!email.includes("@")){
      return this.setState({ error: 'Email is badly formatted.', email: '', password: '', verifyPassword: ''})
    }
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
    try{
      await axios.post(`${ROOT_URL}/createUser`, {
        email: email,
        password: password,
        username: username
      })
      await axios.post(`${ROOT_URL}/verifyEmail`, { email: email })
      this.props.navigation.navigate('emailVerification', {email});
    }
    catch (err) {
      return this.setState({ error: err})
    }
  }

}

const styles = StyleSheet.create({
  container: {
    height: 60,
    flex: 1,

  },
});
