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


export default class SignUpScreen extends React.Component {
  static navigationOptions = {
    title: null,
  };

  render() {
    return (

      <KeyboardAvoidingView style={styles.container} behavior="padding">

      <Container style={{justifyContent: 'space-evenly'}}>

        <Content style={{paddingTop: 50}}>
        <Image style={{width: window.width, height: 150}} source={require('../assets/images/logoTeal.png')} />


          <Form style={{paddingHorizontal: 20}}>
            <Item stackedLabel>
              <Label>First Name</Label>
              <Input />
            </Item>
            <Item stackedLabel>
              <Label>Last Name</Label>
              <Input />
            </Item>
            <Item stackedLabel>
              <Label>Username</Label>
              <Input />
            </Item>
            <Item stackedLabel last>
              <Label>Password</Label>
              <Input />
            </Item>
            <Item stackedLabel>
              <Label>Email</Label>
              <Input />
            </Item>
          </Form>

          <Button style={{backgroundColor: '#9abdb5', paddingHorizontal: 20}} block onPress={this._verify} >
            <Text>Sign Up </Text>
          </Button>



        </Content>

      <View style={{ height: 60 }} />
      </Container>

      </KeyboardAvoidingView>


    );
  }

  _verify = () => {
    this.props.navigation.navigate('emailVerification');
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
