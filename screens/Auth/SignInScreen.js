import React from 'react';
import { Keyboard, View, Linking, Platform} from 'react-native';
const firebase = require("firebase");
require("firebase/firestore");

import {AuthButton, AuthButtonTrans, AuthItem, AuthContainerLogo, AuthForm, ErrorToast, Loading} from '../../components';

export default class SignInScreen extends React.Component {
  static navigationOptions = {
    title: null,
  };

  state = { email: "", password: "", signIn: true};

  _display_buttons = () => {
    return (
      <View>
        <AuthButton text='Sign In' onClick={this._signIn} type='dark'/>
        <AuthButton text='Sign Up' onClick={this._NavigateSignUp} type='light'/>
        <AuthButtonTrans text='Forgot Password' onPress={this._NaviagteForgotPassword}/>
        <AuthButton text='Admin Sign In' onClick={this._signInAdmin} type='dark'/>
      </View>
    )
  };

  render() {
    console.log('\nSignInScreen');
    return (
      <AuthContainerLogo>

        <AuthForm>
          <AuthItem label='Email' defaultValue={this.state.email} onChangeText={email => this.setState({ email })}/>
          <AuthItem label='Password' defaultValue={this.state.password} secureTextEntry={true}
                    onChangeText={password => this.setState({ password })} />
        </AuthForm>

        {this.state.signIn === true ? this._display_buttons(): <Loading/>}

      </AuthContainerLogo>
    );
  }

  _NaviagteForgotPassword = () => {this.props.navigation.navigate('ForgotPassword');};

  _NavigateSignUp = () => {this.props.navigation.navigate('SignUp');};

  _signIn = async () => {
    Keyboard.dismiss();
    this.setState({signIn: false});
    this.forceUpdate();

    const db = firebase.firestore();
    var that = this;
    const { email, password } = this.state;

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('signInWithEmailAndPassword');

        if(!firebase.auth().currentUser.emailVerified){
          console.log('Email Verification Required');
          return that.props.navigation.navigate('emailVerification', {email});
        }

        const uid = firebase.auth().currentUser.uid;
        var reset_password = db.collection('users').doc(uid).collection('auth').doc('reset_password');
        reset_password.get()
          .then(function (doc) {
            if (!doc.exists){
              that.setState({email:'', password: '', signIn: true});
              that.forceUpdate();
              return console.log('reset_password doesn\'t exist');
            }
            data = doc.data();
            if(data.passwordReset){
              console.log('Password Reset');
              return that.props.navigation.navigate('PasswordReset');
            }
            console.log('Main');
            that.props.navigation.navigate('Main');
          })
          .catch(function (err) {
            console.log(err);
            that.setState({email:'', password: '', signIn: true});
            that.forceUpdate();
            return ErrorToast();
          });
      })
      .catch(function(error) {
        that.setState({email:'', password: '', signIn: true});
        that.forceUpdate();
        console.log(error.code);
        switch(error.code) {
          case 'auth/user-not-found':
            ErrorToast('User Not Found');
            break;
          case 'auth/invalid-email':
            ErrorToast('Invalid Email');
            break;
          case 'auth/wrong-password':
            ErrorToast('Invalid Password');
            break;
          default:
            ErrorToast();
            break;
        }
      });
  };


  _signInAdmin = async () => {
    Keyboard.dismiss();
    this.setState({signIn: false});
    this.forceUpdate();

    const db = firebase.firestore();
    var that = this;
    const email = "tejitpabari99@gmail.com";
    const password = "bread123";

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('signInWithEmailAndPassword');

        if(!firebase.auth().currentUser.emailVerified){
          console.log('Email Verification Required');
          return that.props.navigation.navigate('emailVerification', {email});
        }

        const uid = firebase.auth().currentUser.uid;
        var reset_password = db.collection('users').doc(uid).collection('auth').doc('reset_password');
        reset_password.get()
          .then(function (doc) {
            if (!doc.exists){
              that.setState({email:'', password: '', signIn: true});
              that.forceUpdate();
              return console.log('reset_password doesn\'t exist');
            }
            data = doc.data();
            if(data.passwordReset){
              console.log('Password Reset');
              return that.props.navigation.navigate('PasswordReset');
            }
            console.log('Main');
            that.props.navigation.navigate('Main');
          })
          .catch(function (err) {
            console.log(err);
            that.setState({email:'', password: '', signIn: true});
            that.forceUpdate();
            return ErrorToast();
          });
      })
      .catch(function(error) {
        that.setState({email:'', password: '', signIn: true});
        that.forceUpdate();
        console.log(error.code);
        switch(error.code) {
          case 'auth/user-not-found':
            ErrorToast('User Not Found');
            break;
          case 'auth/invalid-email':
            ErrorToast('Invalid Email');
            break;
          case 'auth/wrong-password':
            ErrorToast('Invalid Password');
            break;
          default:
            ErrorToast();
            break;
        }
      });
  };
}