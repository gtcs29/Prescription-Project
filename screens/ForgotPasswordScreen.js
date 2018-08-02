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


export default class ForgotPasswordScreen extends React.Component {
  static navigationOptions = {
    title: null,
  };

  state = {
    email: ""
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


          <Button style={{backgroundColor: '#4b8477', marginHorizontal: 20, marginVertical: 10}} block onPress={this._signUp} >
            <Text>Send Password </Text>
          </Button>


        </Content>

      <View style={{ height: 60 }} />
      </Container>

      </KeyboardAvoidingView>


    );
  }

  _signUp = () => {
    this.props.navigation.navigate('SignUp');
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
