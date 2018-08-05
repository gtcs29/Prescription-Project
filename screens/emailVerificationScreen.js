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
import firebase from 'firebase';
import axios from 'axios';

const window = Dimensions.get('window');
const ROOT_URL = 'https://us-central1-prescriptions-gtcs29.cloudfunctions.net'

export default class emailVerificationScreen extends React.Component {
  static navigationOptions = {
    title: null,
  };

  state = {
    code: "",
    error: ""
  }
  render() {
    return (

      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>

        <Content style={{paddingTop: 50}}>
        <Image style={{width: window.width, height: 150}} source={require('../assets/images/logoTeal.png')} />

          <Form style={{paddingHorizontal: 20, paddingBottom: 20}}>
            <Item stackedLabel>
              <Label>Verification Code</Label>
              <Input secureTextEntry={true} onChangeText={code => this.setState({ code })}/>
            </Item>
          </Form>

          <ActivityIndicator size="large" color="#9abdb5" style={{paddingBottom: 20}} />

          <View style={{paddingBottom: 10}}>
            <Button transparent full >
              <Text style={{color: '#4b8477'}}>Resend Email</Text>
            </Button>
          </View>

          <Button style={{backgroundColor: '#9abdb5', paddingHorizontal: 20}} block onPress={this._verifyEmail} >
            <Text>Sign In </Text>
          </Button>

        </Content>

        <View style={{ height: 10 }} />

      </KeyboardAvoidingView>
    );
  }

  _verifyEmail = async () => {
    console.log(this.state.error)
    try{
      let {data} = await axios.post(`${ROOT_URL}/verifyEmailCode`, {
        code: this.state.code,
        email: this.props.navigation.state.params.email
      });
      firebase.auth().signInWithCustomToken(data.token);
      await axios.post(`${ROOT_URL}/welcomeEmail`, {
        uid: firebase.auth().currentUser.uid
      });
      this.props.navigation.navigate('Main');
    }
    catch (err) {
      return this.setState({ error: err})
    }

  };
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    flex: 1,

  },
});
