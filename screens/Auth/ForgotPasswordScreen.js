import React from 'react';
import axios from 'axios';
const ROOT_URL = 'https://us-central1-prescriptions-gtcs29.cloudfunctions.net';
import firebase from 'firebase';
require("firebase/firestore");

import {AuthButton, AuthItem, AuthContainerLogo, AuthForm, ErrorToast, Loading} from '../../components';


export default class ForgotPasswordScreen extends React.Component {
  static navigationOptions = {
    title: null,
  };

  state = {email: "", resetPass: true};

  render() {
    return (
      <AuthContainerLogo>
        <AuthForm>
          <AuthItem label='Email' defaultValue={this.state.email} onChangeText={email => this.setState({ email })}/>
        </AuthForm>
        {this.state.resetPass===true ? <AuthButton text='Reset Password' type='dark' onClick={this._resetPassword}/> : <Loading/>}
      </AuthContainerLogo>
    );
  }

  _resetPassword = async () => {
    this.setState({resetPass: false});
    this.forceUpdate();
    var that = this;
    try{
      await axios.post(`${ROOT_URL}/resetPassword`, {
        email: that.state.email
      });
      ErrorToast('Password Reset Email sent');
      that.props.navigation.navigate("SignIn");
    }
    catch (err) {
      console.log(err);
      this.setState({resetPass: true});
      this.forceUpdate();
      return ErrorToast();
    }
  };
}