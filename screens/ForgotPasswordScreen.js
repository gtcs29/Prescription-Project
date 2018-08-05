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


export default class ForgotPasswordScreen extends React.Component {
  static navigationOptions = {
    title: null,
  };

  state = {
    email: "",
    success: ""
  }

  render() {
    return (

      <KeyboardAvoidingView style={styles.container} behavior="padding">

      <Container style={{justifyContent: 'space-evenly'}}>

        <Content style={{paddingTop: 50}}>
        <Image style={{width: window.width, height: 150}} source={require('../assets/images/logoTeal.png')} />


          <Form style={{paddingHorizontal: 20, paddingVertical:20}}>
            <Item stackedLabel>
              <Label>Email</Label>
              <Input onChangeText={email => this.setState({ email })}/>
            </Item>

          </Form>


          <Button style={{backgroundColor: '#4b8477', marginHorizontal: 20, marginVertical: 10}} block onPress={this._resetPassword} >
            <Text>Reset Password </Text>
          </Button>


        </Content>

      <View style={{ height: 60 }} />
      </Container>

      </KeyboardAvoidingView>


    );
  }

  _resetPassword = async () => {
    var that = this;
    console.log(that.state.success);
    try{
      await axios.post(`${ROOT_URL}/resetPasswordEmail`, {
        email: that.state.email
      })
      that.setState({ success: "A Password reset email has been sent to you. PLease login with that new password."})
    }
    catch (err) {
      return console.log(err);
    }
  };
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    flex: 1,
  },
});
