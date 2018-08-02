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


export default class emailVerificationScreen extends React.Component {
  static navigationOptions = {
    title: null,
  };

  render() {
    return (

      <KeyboardAvoidingView style={styles.container} behavior="padding">

      <Container style={{justifyContent: 'space-evenly'}}>

        <Content style={{paddingTop: 50}}>
        <Image style={{width: window.width, height: 150}} source={require('../assets/images/logoTeal.png')} />



          <Form style={{paddingHorizontal: 20, paddingBottom: 20}}>
            <Item stackedLabel>
              <Label>Email</Label>
              <Input />
            </Item>
          </Form>

          <ActivityIndicator size="large" color="#9abdb5" style={{paddingBottom: 20}} />


          <View style={{paddingBottom: 10}}>

          <Button transparent full >
            <Text style={{color: '#4b8477'}}>Resend Email</Text>
          </Button>

          </View>


          <Button style={{backgroundColor: '#9abdb5', paddingHorizontal: 20}} block onPress={this._signIn} >
            <Text>Sign In </Text>
          </Button>

        </Content>

      <View style={{ height: 60 }} />
      </Container>

      </KeyboardAvoidingView>


    );
  }

  _signIn = () => {
    this.props.navigation.navigate('SignIn');
  }

  _signInAsync = async () => {
    await AsyncStorage.setItem('userToken', 'abc');
    this.props.navigation.navigate('Main');
  };
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    flex: 1,

  },
});
