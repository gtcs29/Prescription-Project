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
import { ListView } from '@shoutem/ui';

import { MonoText } from '../components/StyledText';
import { createStackNavigator, createSwitchNavigator } from 'react-navigation';
import { ListItem, Icon, Container, Button, Text, Content, Form, Item, Label, Input, Header, Body, Title, Card, CardItem, List} from 'native-base';
import Accordion from 'react-native-collapsible/Accordion';
// import PropTypes from 'prop-types';

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
      medicines: this.props.navigation.state.params.newVar.medicines,
      appointments: this.props.navigation.state.params.newVar.appointments,
      diagnosis: this.props.navigation.state.params.newVar.diagnosis,
      tests: this.props.navigation.state.params.newVar.testres
    }

      for(var i = 0; i < this.props.navigation.state.params.newVar.medicines.length; i++) {
        var newVar = {
          title: this.props.navigation.state.params.newVar.medicines[i].medicine,
          content: this.props.navigation.state.params.newVar.medicines[i].medicineDosage
        }
        this.state.dataArray.push(newVar);
      }
      // for(var i = 0; i < Object.keys(this.props.navigation.state.params.newVar.appointments).length; i++) {
      //   var val = "Appointment" + i;
      //
      //   this.state.appointments.push(this.props.navigation.state.params.newVar.appointments[val]);
      // }
      // for(var i = 0; i < Object.keys(this.props.navigation.state.params.newVar.diagnosis).length; i++) {
      //   var val = "Diagnosis" + i;
      //
      //   this.state.diagnosis.push(this.props.navigation.state.params.newVar.diagnosis[val]);
      // }
      // for(var i = 0; i < Object.keys(this.props.navigation.state.params.newVar.testres).length; i++) {
      //   var val = "testres" + i;
      //
      //   this.state.tests.push(this.props.navigation.state.params.newVar.testres[val]);
      // }




  }

  renderRowOld = (medicineList) => {
    return(
      <ImageBackground style={{width: window.width, height: 100}} source={require('../assets/images/purpleBackground.png')} >

      <View style={styles.ListViewEven}>

        <View>
          <Text style={{fontWeight: "bold"}}>{medicineList.medName}</Text>
          <Text>{medicineList.startDate}</Text>
          <Text>{medicineList.endDate}</Text>
        </View>
      </View>
      </ImageBackground>
    )
  }

  // renderRowMeds = (medicineList) => {
  //   var header = (
  //     <View >
  //       <Text>{medicineList.medName}</Text>
  //     </View>
  //   );
  //
  //   var content = (
  //     <View >
  //       <Text>{medicineList.startDate}</Text>
  //       <Text>{medicineList.endDate}</Text>
  //     </View>
  //   );
  //
  //   return (
  //     <Accordion
  //       header={header}
  //       content={content}
  //       easing="easeOutCubic"
  //     />
  //   );
  // }


_renderHeaderMeds(section) {
  return (
      <View style={{justifyContent: 'space-between', backgroundColor: "#d0716b", padding: 10, flexDirection: 'row'}}>
        <Text style={{fontWeight: 'bold', fontSize: 14}}>{section.medName}</Text>
        <Icon name='add'/>
      </View>
  );
}
_renderContentMeds(section) {
  var stringTimes = "";

  for(var i = 1; i < Object.keys(section.Times).length+1; i++) {
    if( i !== Object.keys(section.Times).length){
      var tim = "Time" + i;
      console.log(section.Times[tim])
      stringTimes = stringTimes + section.Times[tim] + ",";
    }
    else {
      var tim = "Time" + i;
      stringTimes = stringTimes + section.Times[tim];
    }
  }
  console.log('WHEE' + stringTimes)

  return (

    <View style={{backgroundColor: "#fbf5f3", padding: 20 }} >
      <Text>{section.startDate} to {section.endDate}</Text>
      <Text>{section.Days} at {stringTimes}</Text>
    </View>
  );
}

_renderHeaderApps(section) {

  // section.appointmentDate = section.appointmentDate.toString();
  section.appointmentDate = section.appointmentDate.split(" ")[0]+ " " + section.appointmentDate.split(" ")[1]+" " +section.appointmentDate.split(" ")[2]+" " +section.appointmentDate.split(" ")[3];
  return (
      <View style={{justifyContent: 'space-between', backgroundColor: "#d0716b", padding: 10, flexDirection: 'row'}}>
        <Text style={{fontWeight: 'bold', fontSize: 14}}>{section.docName} | {section.appointmentDate}</Text>
        <Icon name='add'/>
      </View>
  );
}
_renderContentApps(section) {
  var stringTimes = "";

  // section.appointmentTime = section.appointmentTime.toString();
  section.appointmentTime = section.appointmentTime.split(" ")[0]

  return (

    <View style={{backgroundColor: "#fbf5f3", padding: 20 }} >
      <Text>{section.clinicAddress}, {section.clinicName} at {section.appointmentTime}</Text>
    </View>
  );
}

_renderHeaderDia(section) {
  return (
      <View style={{justifyContent: 'space-between', backgroundColor: "#d0716b", padding: 10, flexDirection: 'row'}}>
        <Text style={{fontWeight: 'bold', fontSize: 14}}>{section.diagnosis}</Text>
        <Icon name='add'/>
      </View>
  );
}
_renderContentDia(section) {
  return (

    <View style={{backgroundColor: "#fbf5f3", padding: 20 }} >
      <Text>{section.diagnosis}</Text>
    </View>
  );
}

_renderHeaderTests(section) {
  return (
      <View style={{justifyContent: 'space-between', backgroundColor: "#d0716b", padding: 10, flexDirection: 'row'}}>
        <Text style={{fontWeight: 'bold', fontSize: 14}}>{section.test}</Text>
        <Icon name='add'/>
      </View>
  );
}
_renderContentTests(section) {

  return (

    <View style={{backgroundColor: "#fbf5f3", padding: 20 }} >
      <Text>Result: {section.result}</Text>
    </View>
  );
}





  render() {
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
              <Accordion
                sections={this.state.medicines}
                touchableComponent={TouchableOpacity}
                renderHeader={this._renderHeaderMeds}
                renderContent={this._renderContentMeds}
              />

              <Header style={{paddingHorizontal: 20}}>
                <Text style={styles.mainText}>Appointments</Text>
              </Header>
              <Accordion
                sections={this.state.appointments}
                touchableComponent={TouchableOpacity}
                renderHeader={this._renderHeaderApps}
                renderContent={this._renderContentApps}
              />

              <Header style={{paddingHorizontal: 20}}>
                <Text style={styles.mainText}>Diagnosis</Text>
              </Header>
              <Accordion
                sections={this.state.diagnosis}
                touchableComponent={TouchableOpacity}
                renderHeader={this._renderHeaderDia}
                renderContent={this._renderContentDia}
              />

              <Header style={{paddingHorizontal: 20}}>
                <Text style={styles.mainText}>Test Results</Text>
              </Header>
              <Accordion
                sections={this.state.tests}
                touchableComponent={TouchableOpacity}
                renderHeader={this._renderHeaderTests}
                renderContent={this._renderContentTests}
              />

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
