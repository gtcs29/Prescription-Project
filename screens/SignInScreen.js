import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
  KeyboardAvoidingView,
} from 'react-native';
import { createStackNavigator, createSwitchNavigator } from 'react-navigation';
import { Container, Button, Text, Content, Form, Item, Label, Input, Header, Body, Title} from 'native-base';


export default class SignInScreen extends React.Component {
  static navigationOptions = {
    title: null,
  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <Header>
          <Body>
            <Title>Prescriptions!</Title>
          </Body>
        </Header>
        <Content>
          <Form>
            <Item stackedLabel>
              <Label>Username</Label>
              <Input />
            </Item>
            <Item stackedLabel last>
              <Label>Password</Label>
              <Input />
            </Item>
          </Form>
          <Button full warning onPress={this._signInAsync}>
            <Text>Sign In </Text>
          </Button>
        </Content>
      <View style={{ height: 60 }} />

      </KeyboardAvoidingView>

    );
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
