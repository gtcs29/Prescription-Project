import React from 'react';
import { Keyboard } from 'react-native';
import axios from 'axios';
import firebase from 'firebase';
require("firebase/firestore");
const ROOT_URL = 'https://us-central1-prescriptions-gtcs29.cloudfunctions.net';

import {AuthButton, AuthItem, AuthContainerLogo, AuthForm, ErrorToast, Loading} from '../../components';

export default class SignUpScreen extends React.Component {
  static navigationOptions = {
    title: null,
  };

  state = {
    username: "",
    password: "",
    email: "",
    verifyPassword: "",
    signUp: true
  };

  render() {
    console.log('\nSign Up Screen');
    return (
      <AuthContainerLogo>
        <AuthForm>
          <AuthItem label='Username' defaultValue={this.state.username} onChangeText={username => this.setState({ username })}/>
          <AuthItem label='Email' defaultValue={this.state.email} onChangeText={email => this.setState({ email })}/>
          <AuthItem label='Password' defaultValue={this.state.password} secureTextEntry={true} onChangeText={password => this.setState({ password })}/>
          <AuthItem label='Verify Pasword' defaultValue={this.state.verifyPassword} secureTextEntry={true} onChangeText={verifyPassword => this.setState({ verifyPassword })}/>
        </AuthForm>
        {this.state.signUp===true ? <AuthButton onClick={this._verify} text='Sign Up' type='light'/>: <Loading/>}
      </AuthContainerLogo>
    );
  }

  _verify = async () => {
    Keyboard.dismiss();
    this.setState({signUp: false});
    this.forceUpdate();
    const {email, password, verifyPassword, username} = this.state;
    var hasNumber = /\d/;
    var hasSpecialCharacters = new RegExp(/[~`!#$%\^&*+=\-\[\]\\';,@_/{}|\\":<>\?]/);

    if(!email.includes("@")){
      this.setState({ email: '', password: '', verifyPassword: '', signUp: true});
      this.forceUpdate();
      return( ErrorToast('Fix Email Format'));
    }

    if(password===""){
      this.setState({ password: '', verifyPassword: '', signUp: true});
      this.forceUpdate();
      return (ErrorToast('Please enter Password'));
    }

    if(password.length < 8 ){
      this.setState({ password: '', verifyPassword: '', signUp: true});
      this.forceUpdate();
      return (ErrorToast('Password Too Short'));
    }

    if(verifyPassword===""){
      this.setState({ password: '', verifyPassword: '', signUp: true});
      this.forceUpdate();
      return (ErrorToast('Please enter Verify Password'));
    }

    if(password !== verifyPassword ){
      this.setState({ password: '', verifyPassword: '', signUp: true});
      this.forceUpdate();
      return(ErrorToast('Passwords don\'t match'));
    }

    if(!hasNumber.test(password) ){
      this.setState({ password: '', verifyPassword: '', signUp: true});
      this.forceUpdate();
      return(ErrorToast('Password must have number'));
    }

    if(hasSpecialCharacters.test(password) ){
      this.setState({ password: '', verifyPassword: '', signUp: true});
      this.forceUpdate();
      return(ErrorToast('Password can\'t have special characters'));
    }

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(() => {
        var user = firebase.auth().currentUser;
        user.updateProfile({ displayName: username });
        var db = firebase.firestore();
        var uid = user.uid;
        console.log(user.uid);
        db.collection('users').doc(uid).collection('auth').doc('reset_password').set({
            passwordReset: false
          })
          .then(() => {
            axios.post(`${ROOT_URL}/verifyEmail`, {email: email})
              .then(() => {
                this.props.navigation.navigate('emailVerification', {email});
              })
              .catch((err) => {
                console.log(err);
                console.log(err.code);
                ErrorToast();
                this.setState({  username: '', email: '', password: '', verifyPassword: '', signUp: true});
                this.forceUpdate();
              })
          })
          .catch((err) => {
            console.log(err);
            console.log(err.code);
            ErrorToast();
            this.setState({  username: '', email: '', password: '', verifyPassword: '', signUp: true});
            this.forceUpdate();
          })
      })
      .catch((err) => {
        console.log(err);
        console.log(err.code);
        this.setState({username: '', email: '', password: '', verifyPassword: '', signUp: true});
        this.forceUpdate();
        switch (err.code) {
          case 'auth/email-already-in-use':
            ErrorToast('Email already in use');
            break;
          default:
            ErrorToast();
            break;
        }
      });
  }
}