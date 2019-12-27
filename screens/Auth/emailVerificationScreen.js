import React from 'react';
import {View} from 'react-native';
import firebase from 'firebase';
import {AuthButton, AuthButtonTrans, AuthItem, AuthContainerLogo, AuthForm, ErrorToast, Loading} from '../../components';
require("firebase/firestore");
import axios from 'axios';
const ROOT_URL = 'https://us-central1-prescriptions-gtcs29.cloudfunctions.net'


export default class emailVerificationScreen extends React.Component {
  static navigationOptions = {
    title: null,
  };

  state = {code: "", verify: true};

  _showButtons = () => {
    return (
      <View>
        <AuthButton text='Verify Email' type='dark' onClick={this._verifyEmail}/>
        <AuthButtonTrans text='Resend Email' onPress={this._resendEmail}/>
      </View>
    )
  };

  render() {
    console.log('Email Verification Screen');
    return (
      <AuthContainerLogo>
        <AuthForm>
          <AuthItem label='Verification Code' secureTextEntry={true} defaultValue={this.state.code} onChangeText={code => this.setState({ code })}/>
        </AuthForm>
        {this.state.verify===true ? this._showButtons() : <Loading/>}
      </AuthContainerLogo>
    );
  }

  _verifyEmail = async () => {
    this.setState({verify: false});
    this.forceUpdate();
    try{
      await axios.post(`${ROOT_URL}/verifyEmailCode`, {
        code: this.state.code,
        email: this.props.navigation.state.params.email
      });
      // firebase.auth().signInWithCustomToken(data.token);
      await axios.post(`${ROOT_URL}/welcomeEmail`, {
        uid: firebase.auth().currentUser.uid
      });
      this.props.navigation.navigate('Main');
    }
    catch (err) {
      console.log(err);
      ErrorToast();
      this.setState({verify: true});
      this.forceUpdate();
    }
  };

  _resendEmail = async () => {
    this.setState({verify: false});
    this.forceUpdate();
    await axios.post(`${ROOT_URL}/verifyEmail`, { email: this.props.navigation.state.params.email });
    ErrorToast('Verification email resent');
    this.setState({verify: true});
    this.forceUpdate();
  }
}