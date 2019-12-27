import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  AsyncStorage,
  ImageBackground,
  Dimensions,
  KeyboardAvoidingView
} from 'react-native';
import { WebBrowser } from 'expo';
import { ListView } from '@shoutem/ui';

import { Picker, Tab, Accordion, Container, Button, Text, Content, Form, Item, Label, Input, Header, Title, Card, CardItem, List, ListItem, Icon, Left, Body, Right, Switch} from 'native-base';

const window = Dimensions.get('window');

import { ExpoConfigView } from '@expo/samples';


export default class MedicalHistoryScreen extends React.Component {
  static navigationOptions = {
    title: 'Profile',
  };
  state = {
    height: "",
    weight: "",
    currentMedications: "",
    allergies: "",
    emergencyContact: "",
    bloodType: "",
    selected2: undefined

  }

  onValueChange2(value: string) {
  this.setState({
    selected2: value
  });
}

  render() {

     return (
        <Container style={styles.container}>
          <ImageBackground style={{width: window.width, height: 125}} source={require('../assets/images/tealBackground.png')} >
            <View style={{flexDirection: 'column', justifyContent: 'space-evenly'}} >
              <View style={{paddingTop: 30, alignItems: 'center', flexDirection: 'row', justifyContent: 'center'}}>
                <Image style={{width: 310, height: 100}} source={require('../assets/images/logoLoginWhite.png')} />
              </View>
            </View>
            </ImageBackground>

            <Content style={{paddingTop: 50}}>

              <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>


                <Form style={{paddingVertical:20}}>
                  <View style={{flexDirection:'row', justifyContent: 'space-between', marginHorizontal: 40}}>
                    <Item stackedLabel>
                      <Label>Height</Label>
                      <Input defaultValue={this.state.height} autoCapitalize={'none'} autoCorrect={false} onChangeText={username => this.setState({ username })}/>
                    </Item>
                    <Text>in</Text>
                  </View>

                  <View style={{flexDirection:'row', justifyContent: 'space-between', marginHorizontal: 25}}>
                    <Item stackedLabel>
                      <Label>Weight</Label>
                      <Input defaultValue={this.state.weight} autoCapitalize={'none'} autoCorrect={false} onChangeText={email => this.setState({ email })}/>
                    </Item>
                    <Item picker>
                      <Picker
                        mode="dropdown"
                        iosIcon={<Icon name="ios-arrow-down-outline" />}
                        style={{ width: undefined }}
                        placeholder="Unit"
                        placeholderStyle={{ color: "#bfc6ea" }}
                        placeholderIconColor="#007aff"
                        selectedValue={this.state.selected2}
                        onValueChange={this.onValueChange2.bind(this)}
                      >
                        <Picker.Item label="kg" value="key0" />
                        <Picker.Item label="pound" value="key1" />

                      </Picker>
                    </Item>
                  </View>
                  <View style={{marginHorizontal: 25}}>
                    <Item stackedLabel >
                      <Label>Allergies</Label>
                      <Input defaultValue={this.state.allergies} autoCapitalize={'none'} autoCorrect={false} secureTextEntry={true} onChangeText={password => this.setState({ password })} />
                    </Item>
                    <Item stackedLabel >
                      <Label>Blood Test</Label>
                      <Input defaultValue={this.state.bloodType} autoCapitalize={'none'} autoCorrect={false} secureTextEntry={true} onChangeText={verifyPassword => this.setState({ verifyPassword })} />
                    </Item>
                    <Item stackedLabel >
                      <Label>Emergency Contact</Label>
                      <Input defaultValue={this.state.emergencyContact} autoCapitalize={'none'} autoCorrect={false} secureTextEntry={true} onChangeText={verifyPassword => this.setState({ verifyPassword })} />
                    </Item>
                  </View>
                  <View style={{ height: 10 }} />
                </Form>

                <Button style={{backgroundColor: '#9abdb5', marginHorizontal: 20, marginVertical: 10}} block>
                  <Text>Save</Text>
                </Button>

              <View style={{ height: 20 }} />

            </KeyboardAvoidingView>

            </Content>

        </Container>
     )
  }
}
const styles = StyleSheet.create({
  container: {
    height: 60,
    flex: 1,

  },

  mainText: {
    paddingVertical: 10,
    paddingHorizontal: 30
  }
});
