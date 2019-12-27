import React from 'react';
import axios from 'axios';
const ROOT_URL = 'https://us-central1-prescriptions-gtcs29.cloudfunctions.net';
import {AuthButton, AuthButtonTrans, AuthItem, AuthContainerLogo, AuthForm, ErrorToast, Loading} from '../../components';
import firebase from 'firebase';
import {Keyboard} from "react-native";
require("firebase/firestore");


export default class PasswordResetScreen extends React.Component {
  static navigationOptions = {
    title: null,
  };

  state = { oldPassword: "",  password: "",  verifyPassword: "" };

  render() {
    return (
      <AuthContainerLogo>
        <AuthForm>
          <AuthItem label='Old Password' defaultValue={this.state.oldPassword} secureTextEntry={true} onChangeText={oldPassword => this.setState({ oldPassword })}/>
          <AuthItem label='New Password' defaultValue={this.state.password} secureTextEntry={true} onChangeText={password => this.setState({ password })}/>
          <AuthItem label='Verify New Password' defaultValue={this.state.verifyPassword} secureTextEntry={true} onChangeText={verifyPassword => this.setState({ verifyPassword })}/>
        </AuthForm>
        <AuthButton text='Change Password' type='dark' onClick={this._verify}/>
      </AuthContainerLogo>
    );
  }

  _verify = async () => {
    Keyboard.dismiss();
    console.log(this.state.error);
    const db = firebase.firestore();
    var user = firebase.auth().currentUser;
    var userId = user.uid;

    const {oldPassword, verifyPassword, password} = this.state
    var hasNumber = /\d/;
    var hasSpecialCharacters = new RegExp(/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/);
    if(password !== verifyPassword ){
      return this.setState({ error: 'Passwords do not match.', password: '', verifyPassword: ''})
    }
    if(password.length < 8 ){
      return this.setState({ error: 'Password must be more than 8 characters.', password: '', verifyPassword: ''})
    }
    if(!hasNumber.test(password)){
      return this.setState({ error: 'Password must contain a number.', password: '', verifyPassword: ''})
    }
    if(hasSpecialCharacters.test(password)){
      return this.setState({ error: 'Password can only contain @ or _ as a special character.', password: '', verifyPassword: ''})
    }
    var that = this;
    const credentials = firebase.auth.EmailAuthProvider.credential(user.email, oldPassword);

    user.reauthenticateWithCredential(credentials)
      .then(() => {
        user.updatePassword(password)
          .then(function() {
            console.log('Password updated');

            var reset_password = db.collection('users').doc(userId).collection('auth').doc('reset_password');
            reset_password.set({passwordReset: false})
            .then(() => {
              axios.post(`${ROOT_URL}/resetPasswordEmail`, {
                uid: userId
              })
                .then(() => {
                  that.props.navigation.navigate('Main')
                })
                .catch((err) => {
                  console.log(err.code, err);
                  ErrorToast();
                  that.setState({error: err.toString(), password: '', verifyPassword: '' });
                  that.forceUpdate();
                })
            })
            .catch((err) => {
              console.log(err.code, err);
              ErrorToast();
              that.setState({error: err.toString(), password: '', verifyPassword: '' });
              that.forceUpdate();
            })
          })
          .catch((err) => {
            console.log(err.code, err);
            ErrorToast();
            that.setState({error: err.toString(), password: '', verifyPassword: '' });
            that.forceUpdate();
          });
      })
      .catch((err) => {
        console.log(err.code, err);
        ErrorToast();
        that.setState({ error: err.toString(), oldPassword: '', password: '', verifyPassword: '' });
        that.forceUpdate();
      });
  }

}
