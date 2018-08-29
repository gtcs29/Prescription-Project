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
    patientName: "Patient Name",
    username: "Username",
    email: "email",
    age: "age",
    birthday: "birthday",
    gender: "gender",
    height: "height",
    weight: "weight",
    currentMedications: "currentMedications"

  }

  render() {

     return (
        <Container style={styles.container}>
          <ImageBackground style={{width: window.width, height: 250}} source={require('../assets/images/tealBackground.png')} >


            <View style={{flexDirection: 'column', justifyContent: 'space-evenly'}} >
              <View style={{paddingTop: 50, alignItems: 'center', flexDirection: 'row'}}>
                <Image style={{width: window.width, height: 130}} source={require('../assets/images/logoLoginWhite.png')} />
              </View>
              <View style={{paddingBottom: 20, alignItems: 'center'}}>
                <Text style={{fontWeight: 'bold', fontSize: 20, color: 'white'}}> {this.state.patientName} </Text>
                <Text style={{fontSize: 20, color: 'white'}}> {this.state.username} </Text>
              </View>
            </View>
            </ImageBackground>


            <Content>
              <ListItem itemDivider>
                <Text />
              </ListItem>
              <ListItem icon button onPress={() => this.props.navigation.navigate('Profile')}>
                <Left>
                  <Button style={{ backgroundColor: "#4b8477" }}>
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

              <ListItem icon button onPress={() => this.props.navigation.navigate('LoginDetails')}>
                <Left>
                  <Button style={{ backgroundColor: "#9abdb5" }}>
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

              <ListItem icon button onPress={() => this.props.navigation.navigate('MedicalHistory')}>
                <Left>
                  <Button style={{ backgroundColor: "#4b8477" }}>
                    <Icon active name="heart" />
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
                  <Button style={{ backgroundColor: "#9abdb5" }}>
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
                  <Button style={{ backgroundColor: "#4b8477" }}>
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
