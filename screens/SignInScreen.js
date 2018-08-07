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
import firebase from 'firebase';

export default class SignInScreen extends React.Component {
  static navigationOptions = {
    title: null,
  };

  state = {
    email: "",
    password: ""
  }

  render() {
    return (

      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>

        <Content style={{paddingTop: 50}}>
        <Image style={{width: window.width, height: 150}} source={require('../assets/images/logoTeal.png')} />

          <Form style={{paddingTop:0, paddingHorizontal: 10, paddingVertical:20}}>
            <Item stackedLabel>
              <Label>Email</Label>
              <Input autoCapitalize={'none'} autoCorrect={false} onChangeText={email => this.setState({ email })}/>
            </Item>
            <Item stackedLabel last>
              <Label>Password</Label>
              <Input secureTextEntry={true} autoCapitalize={'none'} autoCorrect={false} onChangeText={password => this.setState({ password })}/>
            </Item>
          </Form>

          <Button style={{backgroundColor: '#4b8477', marginHorizontal: 20, marginVertical: 10}} block onPress={this._signInAsync} >
            <Text>Sign In </Text>
          </Button>


          <Button style={{backgroundColor: '#9abdb5', marginHorizontal: 20, marginVertical: 10}} block onPress={this._signUp} >
            <Text>Sign Up </Text>
          </Button>

          <View style={{paddingBottom: 10}}>
            <Button transparent full onPress={this._forgotPassword} >
              <Text style={{color: '#4b8477'}}>Forgot Password</Text>
            </Button>
          </View>

        </Content>
        <View style={{ height: 10 }} />
      </KeyboardAvoidingView>


    );
  }

  _forgotPassword = () => {
    this.props.navigation.navigate('ForgotPassword');
  }

  _signUp = () => {
    this.props.navigation.navigate('SignUp');
  }

  _signInAsync = async () => {
    Keyboard.dismiss();
    var that = this;
    const { email, password } = this.state;
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => {
        if(!firebase.auth().currentUser.emailVerified){
          return that.setState({ error: 'Please verify your email before logging in.'})
        }

        var userId = firebase.auth().currentUser.uid;
        var ref = firebase.database().ref("users/" + userId+ "/auth/reset_password");

        ref.on('value', function(snapshot) {
          ref.off();
          console.log(snapshot.val().passwordReset);
          if(snapshot.val().passwordReset){
            return that.props.navigation.navigate('PasswordReset');//change this to password Reset screen.
          }
        })

        that.props.navigation.navigate('Main');
      })
      .catch(function(error) {
        switch(error.code) {
          case 'auth/user-not-found':
            Toast.show({
                text: 'User Not Found',
                buttonText: "Okay",
                buttonTextStyle: { color: "#008000" },
                buttonStyle: { backgroundColor: "#5cb85c" }
              })
          case 'auth/invalid-email':
            Toast.show({
                text: 'Invalid Email',
                buttonText: "Okay",
                buttonTextStyle: { color: "#008000" },
                buttonStyle: { backgroundColor: "#5cb85c" }
              })
        }


      });
  };
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    flex: 1,

  },
});
