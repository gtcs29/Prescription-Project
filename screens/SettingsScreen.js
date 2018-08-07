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
  Dimensions
} from 'react-native';
import { WebBrowser } from 'expo';
import { ListView } from '@shoutem/ui';
import { MonoText } from '../components/StyledText';
import { Tab, Accordion, Container, Button, Text, Content, Form, Item, Label, Input, Header, Title, Card, CardItem, List, ListItem, Icon, Left, Body, Right, Switch} from 'native-base';

const window = Dimensions.get('window');

import { ExpoConfigView } from '@expo/samples';


export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Profile',
  };
  state = {
    patientName: "Patient Test Name",
    username: "Username",
    email: "email",
    age: "age",
    birthday: "birthday",
    gender: "gender",
    height: "height",
    weight: "weight",
    currentMedications: "currentMedications"

  }

  _update = () => {
    this.props.navigation.navigate('ProfileLoginForm');
  }

  _update2 = () => {
    this.props.navigation.navigate('ProfilePersonalForm');

  }

  _update3 = () => {
    this.props.navigation.navigate('ProfileMedicalForm');

  }

  render() {

     return (
        <Container style={styles.container}>


            <View style={{flexDirection: 'row', justifyContent: 'flex-start'}} >
              <View style={{paddingVertical: 30, marginLeft: 10, marginRight: 5, alignItems: 'center', flexDirection: 'row'}}>
                <Image style={{width: 100, height: 22}} source={require('../assets/images/logoTeal2.png')} />
              </View>
              <View style={{paddingVertical: 30, paddingHorizontal: 20}}>
                <Text style={{fontWeight: 'bold'}}> {this.state.patientName} </Text>
                <Text> {this.state.username} </Text>
              </View>
            </View>
            <Content>
              <ListItem icon>
                <Left>
                  <Button style={{ backgroundColor: "#FF9501" }}>
                    <Icon active name="ios-body" />
                  </Button>
                </Left>
                <Body>
                  <Text>Profile</Text>
                </Body>
                <Right>
                  <Icon active name="arrow-forward" />
                </Right>
              </ListItem>

              <ListItem icon>
                <Left>
                  <Button style={{ backgroundColor: "#007AFF" }}>
                    <Icon active name="ios-key" />
                  </Button>
                </Left>
                <Body>
                  <Text>Privacy and Login</Text>
                </Body>
                <Right>
                  <Icon active name="arrow-forward" />
                </Right>
              </ListItem>

              <ListItem icon>
                <Left>
                  <Button style={{ backgroundColor: "#007AFF" }}>
                    <Icon active name="ios-heart" />
                  </Button>
                </Left>
                <Body>
                  <Text>Medical Details</Text>
                </Body>
                <Right>
                  <Icon active name="arrow-forward" />
                </Right>
              </ListItem>

              <ListItem itemDivider>
                <Text />
              </ListItem>

              <ListItem icon>
                <Left>
                  <Button style={{ backgroundColor: "#007AFF" }}>
                    <Icon active name="md-help" />
                  </Button>
                </Left>
                <Body>
                  <Text>Help</Text>
                </Body>
                <Right>
                  <Icon active name="arrow-forward" />
                </Right>
              </ListItem>

              <ListItem icon>
                <Left>
                  <Button style={{ backgroundColor: "#007AFF" }}>
                    <Icon active name="ios-information" />
                  </Button>
                </Left>
                <Body>
                  <Text>About us</Text>
                </Body>
                <Right>
                  <Icon active name="arrow-forward" />
                </Right>
              </ListItem>

              <ListItem itemDivider>
                <Text />
              </ListItem>

              <ListItem>
                <Text style={{alignSelf: 'center', color: 'red'}}>Logout</Text>
              </ListItem>

              <ListItem itemDivider>
                <Text />
              </ListItem><ListItem itemDivider>
                <Text />
              </ListItem><ListItem itemDivider>
                <Text />
              </ListItem><ListItem itemDivider>
                <Text />
              </ListItem><ListItem itemDivider>
                <Text />
              </ListItem><ListItem itemDivider>
                <Text />
              </ListItem>

          </Content>
        </Container>
     )
  }
}
/*
<ImageBackground style={{width: window.width, height: window.height}} source={require('../assets/images/tealBackground.png')} >
  <View style={{flexDirection: 'row', marginBottom: 10, marginTop: 20, marginHorizontal:20, alignItems: 'center', justifyContent: "space-between"}}>
    <Text style={{fontWeight: 'bold'}}> Login Details </Text>
    <Button bordered light small onPress={this._update}> <Text> Update</Text> </Button>
  </View>
  <View style={{backgroundColor: '#ffffff', marginHorizontal: 20, marginTop: 10, marginBottom: 2}}>
    <Text style={styles.mainText}> Name: {this.state.patientName} </Text>
  </View>
  <View style={{backgroundColor: '#ffffff', marginHorizontal: 20, marginVertical: 2}}>
    <Text style={styles.mainText}> Username: {this.state.username} </Text>
  </View>
  <View style={{backgroundColor: '#ffffff', marginHorizontal: 20, marginVertical: 2}}>
    <Text style={styles.mainText}> Email: {this.state.email} </Text>
  </View>

  <View style={{flexDirection: 'row', marginBottom: 10, marginTop: 20, marginHorizontal:20, alignItems: 'center', justifyContent: "space-between"}}>
    <Text style={{fontWeight: 'bold'}}> Personal Details </Text>
    <Button bordered light small onPress={this._update2}> <Text> Update</Text> </Button>
  </View>
  <View style={{backgroundColor: '#ffffff', marginHorizontal: 20, marginTop: 10, marginBottom: 2}}>
    <Text style={styles.mainText}> Age: {this.state.age} </Text>
  </View>
  <View style={{backgroundColor: '#ffffff', marginHorizontal: 20, marginVertical: 2}}>
    <Text style={styles.mainText}> Birthday: {this.state.birthday} </Text>
  </View>
  <View style={{backgroundColor: '#ffffff', marginHorizontal: 20, marginVertical: 2}}>
    <Text style={styles.mainText}> Gender: {this.state.gender} </Text>
  </View>

  <View style={{flexDirection: 'row', marginBottom: 10, marginTop: 20, marginHorizontal:20, alignItems: 'center', justifyContent: "space-between"}}>
    <Text style={{fontWeight: 'bold'}}> Medical Details </Text>
    <Button bordered light small onPress={this._update3}> <Text> Update</Text> </Button>
  </View>
  <View style={{backgroundColor: '#ffffff', marginHorizontal: 20, marginTop: 10, marginBottom: 2}}>
    <Text style={styles.mainText}> Height: {this.state.height} </Text>
  </View>
  <View style={{backgroundColor: '#ffffff', marginHorizontal: 20, marginVertical: 2}}>
    <Text style={styles.mainText}> Weight: {this.state.weight} </Text>
  </View>
  <View style={{backgroundColor: '#ffffff', marginHorizontal: 20, marginVertical: 2}}>
    <Text style={styles.mainText}> Medications: {this.state.currentMedications} </Text>
  </View>
  </ImageBackground>

*/
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
