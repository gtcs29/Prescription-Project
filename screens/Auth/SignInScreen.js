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

  componentDidMount() {
    if (Platform.OS === 'android') {
      Linking.getInitialURL().then(url => {
        this.navigate(url);
      });
    } else {
      Linking.addEventListener('url', this.handleOpenURL);
    }
  }

  componentWillUnmount() { // C
    Linking.removeEventListener('url', this.handleOpenURL);
  }

  handleOpenURL = (event) => { // D
    this.navigate(event.url);
  }

  navigate = (url) => {
    const params = url.split('?')[1].split('&');
    const mode = params[0].split('=')[1];
    const oobCode = params[1].split('=')[1];
    const apiKey = params[2].split('=')[1];
    // var continueUrl = null;
    // var lang = null;
    // if (params.length > 3) {
    //   if (params[3].split('=')[0] === 'continueUrl'){
    //     continueUrl = params[3].split('=')[1];
    //   }
    //   else {
    //     lang = params[3].split('=')[1];
    //   }
    // }
    // if (params.length > 4) {
    //   if (params[4].split('=')[0] === 'continueUrl'){
    //     continueUrl = params[3].split('=')[1];
    //   }
    //   else {
    //     lang = params[4].split('=')[1];
    //   }
    // }


  };

  _display_buttons = () => {
    return (
      <View>
        <AuthButton text='Sign In' onClick={this._signIn} type='dark'/>
        <AuthButton text='Sign Up' onClick={this._NavigateSignUp} type='light'/>
        <AuthButtonTrans text='Forgot Password' onPress={this._NaviagteForgotPassword}/>
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
    this.setState({signIn: false});
    this.forceUpdate();
    Keyboard.dismiss();

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
}