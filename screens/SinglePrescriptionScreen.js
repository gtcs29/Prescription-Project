import React from 'react';
import {
  Dimensions,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  AsyncStorage,
  ImageBackground
} from 'react-native';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';
import { createStackNavigator, createSwitchNavigator } from 'react-navigation';
import { ListItem, Icon, Accordion, Container, Button, Text, Content, Form, Item, Label, Input, Header, Body, Title, Card, CardItem, List} from 'native-base';


const window = Dimensions.get('window');
export default class SinglePrescriptionScreen extends React.Component {
  static navigationOptions = {
    title: 'Prescription',
  };

  constructor(props) {
    super(props);
    this.state = {
      dataArray: [
      ],
      appointments: [

      ],
      diagnosis: [

      ],
      tests: [

      ]
    }


      for(var i = 0; i < this.props.navigation.state.params.newVar.medicines.length; i++) {
        var newVar = {
          title: this.props.navigation.state.params.newVar.medicines[i].medicine,
          content: this.props.navigation.state.params.newVar.medicines[i].medicineDosage
        }
        this.state.dataArray.push(newVar);
      }
      for(var i = 0; i < Object.keys(this.props.navigation.state.params.newVar.appointments).length; i++) {
        var val = "Appointment" + i;

        this.state.appointments.push(this.props.navigation.state.params.newVar.appointments[val]);
      }
      for(var i = 0; i < Object.keys(this.props.navigation.state.params.newVar.diagnosis).length; i++) {
        var val = "Diagnosis" + i;

        this.state.diagnosis.push(this.props.navigation.state.params.newVar.diagnosis[val]);
      }
      for(var i = 0; i < Object.keys(this.props.navigation.state.params.newVar.testres).length; i++) {
        var val = "testres" + i;

        this.state.tests.push(this.props.navigation.state.params.newVar.testres[val]);
      }




  }




  render() {
    console.log(this.props.navigation.state.params.newVar);
    return (



      <Container>
        <View style={styles.container}>
          <Header style={styles.dateText}>
            <Text >{this.props.navigation.state.params.newVar.date}</Text>

          </Header>
          <Content>
                <ImageBackground style={{width: window.width, height: 100}} source={require('../assets/images/purpleBackground.png')} >
                  <View style={{justifyContent: 'space-between', flexDirection: 'column', paddingVertical: 20, paddingHorizontal: 20, height: 100}}>
                    <Text>Doctor: {this.props.navigation.state.params.newVar.docName}</Text>
                    <Text>Patient: {this.props.navigation.state.params.newVar.patientName}</Text>
                  </View>
                </ImageBackground>
              <Header style={{paddingHorizontal: 20}}>
                <Text style={styles.mainText}>Medicines</Text>
              </Header>

              <Accordion dataArray={this.state.dataArray} icon="add" expandedIcon="remove"
                style={{paddingHorizontal: 20}}
                headerStyle={{ backgroundColor: "#d0716b"}}
                contentStyle={{ backgroundColor: "#fbf5f3" }}
              />

              <Header style={{paddingHorizontal: 20}}>
                <Text style={styles.mainText}>Diagnosis</Text>
              </Header>

              <List dataArray={this.state.diagnosis}
                renderRow={(item) =>
                  <ListItem>
                    <Text>{item}</Text>
                  </ListItem>
                }>
              </List>

              <Header style={{paddingHorizontal: 20}}>
                <Text style={styles.mainText}>Appointments</Text>
              </Header>

              <List dataArray={this.state.appointments}
                renderRow={(item) =>
                  <ImageBackground style={{width: window.width, height: 48}} source={require('../assets/images/purpleBackground.png')} >

                  <ListItem>

                    <Text>{item}</Text>
                  </ListItem>
                  </ImageBackground>

                }>
              </List>





              <Header style={{paddingHorizontal: 20}}>

                  <Text style={styles.mainText}>Test Results</Text>

              </Header>

              <List dataArray={this.state.tests}
                renderRow={(item) =>
                  <ListItem>
                    <Text>{item}</Text>
                  </ListItem>
                }>
              </List>



            </Content>
        </View>

      </Container>

    );
  }


  _showMoreApp = () => {
    this.props.navigation.navigate('Other');
  };

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };

}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  dateText: {
    flexDirection: "column",
    alignItems:"flex-end"
  },
  mainText: {
    fontWeight: 'bold',
  }
});
